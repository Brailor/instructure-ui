import {
  AUDIO_DEVICE_CHANGED,
  CLOSE_CLICKED,
  COUNTDOWN_COMPLETE,
  FINISH_CLICKED,
  ONCOMPLETE,
  SAVE_CLICKED,
  START_CLICKED,
  STARTOVER_CLICKED,
  TITLE_EDITED,
  VIDEO_DEVICE_CHANGED,
  DEVICE_REQUEST_ACCEPTED,
  MEDIA_RECORDER_INITIALIZED,
  VIDEO_OBJECT_GENERATED,
  ERROR_OCCURRED
} from '../constants/ActionTypes'

import {
  FINISHED,
  PREVIEWSAVE,
  READY,
  RECORDING,
  SAVING,
  STARTING,
  LOADING,
  ERROR
} from '../constants/CaptureStates'

const initialState = {
  captureState: LOADING,
  videoSrc: "",
  msg: ''
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case AUDIO_DEVICE_CHANGED:
      return {
        ...state,
        audioDeviceId: action.id
      }

    case CLOSE_CLICKED:
      if ([READY, STARTING, RECORDING, PREVIEWSAVE].includes(state.captureState)) {
        return {
          ...state,
          captureState: READY
        }
      } else {
        return state
      }

    case COUNTDOWN_COMPLETE:
      if (state.captureState !== STARTING) { return state }

      return {
        ...state,
        captureState: RECORDING
      }

    case DEVICE_REQUEST_ACCEPTED:
      return {
        ...state,
        captureState: READY
      }

    case ERROR_OCCURRED:
      return {
        ...state,
        msg: action.msg,
        captureState: ERROR
      }

    case FINISH_CLICKED:
      if (state.captureState !== RECORDING) { return state }

      state.mediaRecorder && state.mediaRecorder.stop()
      return {
        ...state,
        captureState: PREVIEWSAVE
      }

    case ONCOMPLETE:
      if (state.captureState !== SAVING) { return state }

      return {
        ...state,
        captureState: FINISHED
      }

    case MEDIA_RECORDER_INITIALIZED:

      return {
        ...state,
        mediaRecorder: action.mr
      }

    case SAVE_CLICKED:
      if (state.captureState !== PREVIEWSAVE) { return state }

      return {
        ...state,
        captureState: SAVING
      }

    case START_CLICKED:
      if (state.captureState !== READY) { return state }

      return {
        ...state,
        captureState: STARTING
      }

    case STARTOVER_CLICKED:
      if (![RECORDING, PREVIEWSAVE].includes(state.captureState)) { return state }

      state.mediaRecorder && state.mediaRecorder.stop()

      return {
        ...state,
        captureState: READY
      }

    case TITLE_EDITED:
      return {
        ...state,
        title: action.text
      }

    case VIDEO_DEVICE_CHANGED:
      return {
        ...state,
        videoDeviceId: action.id
      }

    case VIDEO_OBJECT_GENERATED:
      return {
        ...state,
        videoSrc: action.src
      }

    default:
      return state
  }
}
