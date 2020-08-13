import Vue from 'vue';
import merge from "@/utils/merge";
import PopupManager from './popup-manager';
import getScrollBarWidth from '../scrollbar-width';
import {getStyle, addClass, removeClass, hasClass} from "@/utils/dom";

let idSeed = 1;

let scrollBarWidth;

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  beforeMount() {

  }
}
