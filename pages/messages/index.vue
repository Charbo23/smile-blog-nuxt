<template>
  <div class="messages-container">
    <split-line :icon="'message'" :desc="'留言墙'"></split-line>
    <section class="editor-wrapper">
      <comment-editor ref="editor" :isMessageEditor="true" @send="onSend"></comment-editor>
    </section>
    <ul class="messages-wrapper markdown" ref="markedContent">
      <li class="message-item" v-for="message in messages" :key="message.id">
        <span v-if="message.nickname" class="nickname">@{{message.nickname}}</span>
        <div class="content">
          <client-only>
            <p v-html="marked(message.content)"></p>
          </client-only>
        </div>
        <time
          class="time"
          :datetime="message.createTime | filterTime"
        >{{message.createTime | filterTime}}</time>
      </li>
    </ul>
    <div v-show="isLoadMore" class="load-more" @click="loadMore"></div>
    <loading v-show="loading"></loading>
    <empty v-if="!loading && !messages.length" :message="'还没有留言 /(ㄒoㄒ)/~~'" :isBack="false"></empty>
    <Dialog :visible.sync="dialogVisible" :loading="imgLoading" :imgSrc="imgSrc"></Dialog>
  </div>
</template>

<script>
import SplitLine from "@/components/base/split-line/split-line";
import CommentEditor from "@/components/base/comment-editor/comment-editor";
import markdown from "@/plugins/marked";
import Dialog from "@/components/base/dialog/dialog";
import { mapState } from "vuex";
import Config from "@config";

export default {
  name: "messages-page",

  components: {
    SplitLine,
    CommentEditor,
    Dialog
  },

  head() {
    return {
      title: "留言墙"
    };
  },

  async fetch({ store, params }) {
    await store.dispatch("message/getMessages", {
      page: 0
    });
  },

  data() {
    return {
      page: 0,
      dialogVisible: false,
      imgLoading: false,
      imgSrc: ""
    };
  },

  computed: {
    ...mapState({
      messages: state => state.message.messages,
      total: state => state.message.total,
      loading: state => state.message.loading
    }),

    isLoadMore() {
      if (this.messages.length && !this.loading) {
        return this.total > this.messages.length;
      } else {
        return false;
      }
    }
  },

  watch: {
    messages() {
      this.$nextTick(() => {
        this.initImage();
      });
    }
  },

  methods: {
    // markdown 解析
    marked(content) {
      return markdown(content);
    },

    loadMore() {
      if (this.loading) {
        return;
      }
      this.page++;
      this.$store.dispatch("message/getMoreMessages", {
        page: this.page
      });
    },

    initImage() {
      if (Config.imageLazyLoad) {
        import("../../services/utils/lazy-img").then(res => {
          res.default(".image-popper");
        });
      }
      const el = this.$refs.markedContent;
      el.addEventListener("click", e => {
        const target = e.target;
        if (
          target.nodeName.toLocaleLowerCase() === "img" &&
          target.classList.contains("image-popper")
        ) {
          e.stopPropagation();
          this.imgLoading = true;
          this.dialogVisible = true;
          const src = target.dataset.origin;

          const image = new Image();
          image.src = src;

          image.onload = () => {
            this.imgSrc = src;
            this.imgLoading = false;
          };

          image.onerror = () => {
            this.imgSrc = src;
            this.imgLoading = false;
          };
        }
      });
    },

    async onSend({ nickname, content }) {
      try {
        const res = await this.$store.dispatch("message/createMessage", {
          nickname,
          content
        });
        if (res && res.errorCode === 0) {
          this.$refs.editor.resetField();
          this.$store.dispatch("message/getMessages", {
            page: 0
          });
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initImage();
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixin.scss";

.messages-container {
  @include container;

  .editor-wrapper {
    margin: 0.5em;
  }
}

.messages-wrapper {
  display: flex;
  flex-wrap: wrap;

  .message-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0.4em 0.5em;
    padding: 1em;
    background-color: var(--tag-color);
    border-radius: 5px;
    @media (max-width: 479px) {
      margin: 0.2em 0.5em;
      padding: 0.5em;
    }

    .nickname {
      height: 24px;
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
    }

    .content {
      flex: 1;
      font-size: $font-size-base;
      padding: 0.5em 0;

      img {
        width: 50%;
      }
    }

    .time {
      margin-top: 1em;
      font-size: $font-size-base;
      text-align: right;
    }
  }
}

.load-more {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  margin: 10px auto 0;
  border: 8px solid #dcdfe7;
  border-radius: 50%;
  transition: all 0.25s ease-in-out;
  cursor: pointer;

  @media (max-width: 479px) {
    width: 30px;
    height: 30px;
    border-width: 5px;
  }

  &:hover {
    border-color: var(--theme-active);
    background-color: var(--theme-active);
    transform: scale(0.65);
  }
}
</style>
