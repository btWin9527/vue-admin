<template>
  <div ref="testRef">
    <div v-for="(item, index) in jsonAnswersArr">
      <!-- classIdx 500 -->
      <div class="item-cont" v-if="item.classIdx === 500">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div v-for="(itemAnswer, itemIdx) in item.jsonAnswers" :key="itemIdx">
          $${{ itemAnswer.suggestedAnswer }}$$
        </div>
      </div>
      <!-- classIdx 607 -->
      <div class="item-cont" v-if="item.classIdx === 607">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div v-for="(itemAnswer, itemIdx) in item.jsonAnswers" :key="itemIdx">
          {{ itemAnswer.suggestedAnswer }}
        </div>
      </div>
      <!-- classIdx 501 -->
      <div class="item-cont" v-if="item.classIdx === 501">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div class="item-answer">
          <span
            class="item-li"
            v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
            :key="itemIdx"
            >{{ itemAnswer.suggestedAnswer }}</span
          >
        </div>
      </div>
      <!-- classIdx 400 -->
      <div class="item-cont" v-if="item.classIdx === 400">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div class="item-answer pinyin-answer">
          <div
            v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
            :key="itemIdx"
            class="pinyin-cont"
          >
            <div class="pinyin-idx">{{ itemIdx + 1 }}.</div>
            <div>
              <div>{{ handlePinyin(itemAnswer.suggestedAnswer)[0] }}</div>
              <div>{{ handlePinyin(itemAnswer.suggestedAnswer)[1] }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- classIdx 404 -->
      <div class="item-cont" v-if="item.classIdx === 404">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div class="item-answer">
          <div
            class="chinese-space"
            v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
            :key="itemIdx"
          >
            {{ itemAnswer.suggestedAnswer }}
          </div>
        </div>
      </div>
      <!-- classIdx 405 -->
      <div class="item-cont" v-if="item.classIdx === 405">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div class="item-answer">
          <div
            class="mb-10"
            v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
            :key="itemIdx"
          >
            {{ itemAnswer.suggestedAnswer }}
          </div>
        </div>
      </div>
      <!-- classIdx 601 -->
      <div class="item-cont" v-if="item.classIdx === 601">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div class="item-answer">
          <div
            class="mb-10"
            v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
            :key="itemIdx"
          >
            {{ itemAnswer.suggestedAnswer }}
          </div>
        </div>
      </div>
      <!-- classIdx 511 -->
      <div class="item-cont" v-if="item.classIdx === 511">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div
          class="mb-10"
          v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
          :key="itemIdx"
        >
          $${{ itemAnswer.suggestedAnswer }}$$
        </div>
      </div>
      <!-- classIdx 502 -->
      <div class="item-cont" v-if="item.classIdx === 502">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div
          class="mb-10"
          v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
          :key="itemIdx"
        >
          $${{ itemAnswer.suggestedAnswer }}$$
        </div>
      </div>
      <!-- classIdx 407 -->
      <div class="item-cont" v-if="item.classIdx === 407">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div class="item-answer">
          <div
            class="mb-10"
            v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
            :key="itemIdx"
          >{{ itemAnswer.suggestedAnswer }}</div
          >
        </div>
      </div>
    </div>
  </div>
  <!--          &lt;!&ndash; classIdx 607 || classIdx 400 || classIdx 404 ||  classIdx 405 &ndash;&gt;-->
  <!--          <div v-if="item.classIdx === 607">-->
  <!--            <div class="item-answer">-->
  <!--              {{ itemAnswer.suggestedAnswer }}-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          &lt;!&ndash; classIdx 501 &ndash;&gt;-->
  <!--          <div v-if="item.classIdx === 501">-->
  <!--            <span class="item-answer">-->
  <!--              {{ itemAnswer.suggestedAnswer }}-->
  <!--            </span>-->
  <!--          </div>-->
</template>
<script>
import { classIdxData } from "../../../api/article";

export default {
  data() {
    return {
      jsonAnswersArr: null
    };
  },
  methods: {
    getClassIdxData() {
      classIdxData().then(res => {
        this.jsonAnswersArr = res.data;
        this.jsonAnswersArr.forEach(item => {
          item.jsonAnswers = item.jsonAnswers.map(itemAnswer => {
            try {
              itemAnswer = JSON.parse(itemAnswer);
            } catch (e) {
              itemAnswer = {};
            }
            return itemAnswer;
          });
        });
        console.log(this.jsonAnswersArr, "  this.jsonAnswersArr");
        this.latexAnalysis();
      });
    },
    latexAnalysis() {
      this.$nextTick(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, this.$el]);
      });
    },
    handlePinyin(answer) {
      if (answer.includes("-")) {
        return answer.split("-");
      }
      return [];
    }
  },
  mounted() {
    this.getClassIdxData();
  }
};
</script>
<style lang="scss" scoped>
.item-li {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
.pinyin-answer {
  display: flex;
  max-width: 300px;
  flex-wrap: wrap;

  .pinyin-cont {
    display: flex;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .pinyin-idx {
    line-height: 36px;
    margin-right: 10px;
  }
}
.item-answer {
  margin-left: 10px;
}
.chinese-space {
  margin-bottom: 10px;
}
.mb-10 {
  margin-bottom: 10px;
}
</style>
