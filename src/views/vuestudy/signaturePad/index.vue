<template>
  <div>
    <div class="container">
      <div class="container">
        <VueSignaturePad
          id="signature"
          width="100%"
          height="500px"
          ref="signaturePad"
          :options="options"
        />
      </div>
      <div class="buttons">
        <button @click="undo">Undo</button>
        <button @click="clear">clear</button>
        <button @click="save">Save</button>
        <button @click="change">Change Color</button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * suggest to use this way to import VueSignaturePad
 */
import {VueSignaturePad} from 'vue-signature-pad'

export default {
  components: {
    VueSignaturePad
  },
  data: () => ({
    options: {
      penColor: "#c0f",
    },
  }),
  methods: {
    /**
     * clear the canvas
     */
    clear() {
      this.$refs.signaturePad.clearSignature();
    },
    /**
     * undo to the previous step
     */
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    /**
     * save the signature for base64
     */
    save() {
      const {isEmpty, data} = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      console.log(data);
    },
    /**
     * change different stroke color
     */
    change() {
      this.options = {
        penColor: "#00f",
      };
    },
  },
};
</script>

<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
  radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container {
  width: 100%;
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>

