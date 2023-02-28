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
        <div
          class="mb-10"
          v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
          :key="itemIdx"
        >
          <h4>{{itemIdx+1}}. 题干</h4>
          <div>$${{ itemAnswer.content }}$$</div>
          <h4 style="font-weight: bold">{{itemIdx+1}}. 答案:</h4>
          <div>
            $${{ itemAnswer.suggestedAnswer }}$$
          </div>

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
          >
            {{ itemAnswer.suggestedAnswer }}
          </div>
        </div>
      </div>
      <!-- classIdx 417  解析异常-->
      <div class="item-cont" v-if="item.classIdx === 417">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <p>备注:拼音不解析</p>
        <div class="item-answer pinyin-answer">
          <div
            v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
            :key="itemIdx"
            class="pinyin-cont"
          >
            <div class="mr-10">{{ itemIdx + 1 }}.</div>
            <div
              v-for="(itemPinYin, idxPinYin) in itemAnswer.subAnswers"
              :key="idxPinYin"
              class="mr-10"
            >
              <div></div>
              <div>{{ handlePinyin(itemPinYin.suggestedAnswer)[1] }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- classIdx 600 -->
      <div class="item-cont" v-if="item.classIdx === 600">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div class="item-answer">
          <div
            class="mb-10"
            v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
            :key="itemIdx"
          >
            <span class="mr-10">({{ itemIdx + 1 }})</span>
            <span>{{ itemAnswer.suggestedAnswer }}</span>
          </div>
        </div>
      </div>
      <!-- classIdx 606 或 416 或 602 -->
      <div
        class="item-cont"
        v-if="
          item.classIdx === 606 ||
            item.classIdx === 416 ||
            item.classIdx === 602
        "
      >
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <div class="item-answer">
          <div
            class="mb-10"
            v-for="(itemAnswer, itemIdx) in item.jsonAnswers"
            :key="itemIdx"
          >
            <span class="mr-10">{{ itemIdx + 1 }}.</span>
            <span>{{ itemAnswer.suggestedAnswer }}</span>
          </div>
        </div>
      </div>
      <!-- classIdx 414 -->
      <div class="item-cont" v-if="item.classIdx === 414">
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
              <div>{{ handlePinyin(itemAnswer.suggestedAnswer)[1] }}</div>
              <div>{{ handlePinyin(itemAnswer.suggestedAnswer)[0] }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- classIdx 406 -->
      <div class="item-cont" v-if="item.classIdx === 406">
        <h4>classIdx{{ item.classIdx }}</h4>
        <h4 style="font-weight: bold">答案:</h4>
        <p>题目中存在错别字的词语如下：</p>
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
      <!-- classIdx 402 或 401 -->
      <div
        class="item-cont"
        v-if="item.classIdx === 402 || item.classIdx === 401"
      >
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
    </div>
  </div>
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
        console.log(this.jsonAnswersArr, " this.jsonAnswersAr");
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
.mr-10 {
  margin-right: 10px;
}
</style>
