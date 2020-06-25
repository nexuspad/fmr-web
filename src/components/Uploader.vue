<template>
  <div class="pb-4">
    <message />
    <div class="container-fluid mb-3 rounded" style="background:#eee;">
      <div class="row pt-2">
        <div class="col-md-3">
          <!-- upload form -->
          <div class="input-group mb-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="inputGroupFile" ref="fileInput" @change="fileSelected($event)" multiple>
              <label class="custom-file-label" for="inputGroupFile" aria-describedby="inputGroupFileAddon">Choose file to upload</label>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="btn-group" v-if="files.length > 0">
            <button class="btn btn-primary" v-on:click="upload()">Upload</button>
            <button class="btn btn-secondary" v-on:click="clearAll()">Clear</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="container-fluid pb-2" v-if="files.length > 0">
            <div class="row pb-2" v-for="(fileObj, index) in files" v-bind:key="index">
              <div class="col-md-6 pb-1" v-bind:class="{active : fileObj.status === 'uploading'}">
                {{ fileObj.file.name }}
                <div class="progress" style="height:1px;">
                  <div class="progress-bar bg-success" role="progressbar" :style="{width: fileObj.uploadProgress + '%'}"></div>
                </div>
              </div>
              <div class="col-1">
                <span v-bind:class="{'text-danger': fileObj.status === 'failed', 'text-success': fileObj.status === 'completed'}">
                  {{ fileObj.status }}
                </span>
              </div>
              <div class="col-1">
                <a class="fas fa-times fa-lg fmr-red" href="javascript:;" @click="cancelUpload(index, fileObj)"
                  v-if="fileObj.status !== 'completed'"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <!-- photo album -->
      <div class="row row-cols-sm-1 row-cols-md-3 row-cols-lg-4" id="PropertyPhotos" :key=forceRefreshKey>
        <div class="col" v-for="photo in ad.photos" v-bind:key="photo.displayOrder" :data-id="photo.viewId">
          <div class="card">
            <img :src="photo.url" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title" v-show="photo.newTitle == null" @click="openTitleEdit(photo)">
                {{ photo.title || 'Add a title' }}
              </h5>
              <div class="input-group" v-show="photo.newTitle != null">
                <input type="text" :ref="'title' + photo.viewId" class="form-control" placeholder="Add a title" v-model="photo.newTitle">
                <div class="input-group-append" id="button-addon4">
                  <button class="btn btn-outline-success" type="button" @click="closeTitleInput(photo.viewId, true)">
                    <i class="fas fa-check"></i></button>
                  <button class="btn btn-outline-secondary" type="button" @click="closeTitleInput(photo.viewId, false)">
                    <i class="fas fa-times"></i></button>
                </div>
              </div>
              <div class="fmr-photo-filename">{{ photo.fileName }}</div>
              <button class="btn btn-danger mt-1" v-on:click="deletePhoto(photo)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
// https://github.com/SortableJS/Sortable
import Sortable from 'sortablejs/modular/sortable.core.esm.js'
import UploadServicePool from '../service/UploadServicePool'
import FileWrapper from '../service/model/FileWrapper'
import AdUpdateHelper from './AdUpdateHelper'
import Message from './Message'
import EventManager from '../util/EventManager'
import AppEvent from '../util/AppEvent'

export default {
  mixins: [ AdUpdateHelper ],
  props: [ 'ad' ],
  data() {
    return {
      forceRefreshKey: Date.now(),
      files: []
    };
  },
  components: {
    Message
  },
  mounted () {
    const self = this
    this.$nextTick(() => {
      const sortable = Sortable.create(document.getElementById('PropertyPhotos'), {
        animation: 200,
        direction: 'horizontal',
        onUpdate: () => {
          self.reorderPhotos(sortable.toArray())
        }
      });
    })
  },
  methods: {
    openTitleEdit(photo) {
      photo.newTitle = photo.title ? photo.title : ''
      console.debug(this.$refs['title' + photo.viewId][0])
      if (this.$refs['title' + photo.viewId][0]) {
        this.$nextTick(() => {
          this.$refs['title' + photo.viewId][0].focus()
        })
      }
    },
    closeTitleInput(viewId, saveIt) {
      for (let i in this.ad.photos) {
        if (this.ad.photos[i].viewId === viewId) {
          if (saveIt) {
            this.ad.photos[i].title = this.ad.photos[i].newTitle
            this.updatePhotoTitle(this.ad.photos[i])
          }
          this.ad.photos[i].newTitle = null
          break
        }
      }
    },
    upload () {
      this._uploadAll();
      let self = this;
      if (this.files.length > UploadServicePool.maxConcurrentUpload) {
        if (UploadServicePool.timerId === 0) {
          UploadServicePool.timerId = setInterval(() => {
            console.debug('kick in uploading cycle.........');
            self._uploadAll()
          }, UploadServicePool.timeInterval * 1000);
        }
      }
    },
    _uploadAll () {
      // let componentSelf = this;
      for (let fileObj of this.files) {
        if (fileObj.status !== FileWrapper.WAITING) {
          continue;
        }

        let serviceInstance = UploadServicePool.getServiceFromPool();
        if (serviceInstance === null) {
          console.debug('no more upload service instance, wait ' + UploadServicePool.timeInterval + ' seconds');
          break;
        }

        const self = this
        serviceInstance.uploadFile(this.ad.id, fileObj.file,
          function ({uploadId = '', completed = 0}) {
            if (uploadId.length !== 0) {
              fileObj.uploadId = uploadId;
            }
            // completion callback may happend after cancellation. make sure keep the status as cancelled.
            if (fileObj.status === FileWrapper.CANCELLED || fileObj.status === FileWrapper.FAILED) {
              fileObj.uploadProgress = 0;
            } else {
              fileObj.uploadProgress = completed;
              fileObj.status = FileWrapper.UPLOADING;
            }
          })
          .then(function (updatedAd) {
            console.debug('upload entry completed.', updatedAd);
            self.ad.mergePhotos(updatedAd)
            // publish an update event after successful uploading.
            fileObj.status = FileWrapper.COMPLETED;
          })
          .catch(function (error) {
            if (fileObj.status !== FileWrapper.CANCELLED) {
              console.debug(error);
              fileObj.status = FileWrapper.FAILED;
              EventManager.publishApiEvent(AppEvent.ofApiFailure(error));
            }
          });
      }
    },
    fileSelected() {
      for (let file of this.$refs.fileInput.files) {
        if (!this.alreadySelected(file)) {
          this.files.push(new FileWrapper(file));
        }
      }
      // clear the value so onChange will fire when same file is selected
      this.$refs.fileInput.value = null;
      return false;
    },
    alreadySelected (file) {
      for (let fileObj of this.files) {
        // this is just a guess
        if (fileObj.file.name === file.name && fileObj.file.size === file.size && fileObj.file.type === file.type) {
          if (fileObj.status === FileWrapper.CANCELLED || fileObj.status === FileWrapper.FAILED) {
            // resume uploading
            fileObj.status = FileWrapper.WAITING;
          }
          return true;
        }
      }
      return false;
    },
    hasFileWaiting () {
      for (let fileObj of this.files) {
        if (fileObj.status === FileWrapper.WAITING) {
          return true;
        }
      }
      return false;
    },
    cancelUpload (index, fileObj) {
      if (fileObj.uploadId.length > 0) {
        console.debug('cancel upload for ', fileObj.uploadId);
        UploadServicePool.cancelUpload(fileObj)
      } else {
        this.files.splice(index, 1);
      }
    },
    clearAll () {
      while (this.files.length > 0) {
        this.files.pop();
      }
    }
  },
  beforeDestroy () {
  }
}
</script>
