<template>
  <div class="about-container">
    <split-line :icon="'about'" :desc="'我们'"></split-line>
    <ul class="author-list">
      <nuxt-link
        class="author-item"
        v-for="author in authors"
        :key="author.id"
        :to="`/about/${author.id}`"
      >
        <div class="author-avatar" :style="{backgroundImage: `url(${author.avatar})`}"></div>
        <div class="author-info-wrapper">
          <h2 class="author-name">{{author.name}}</h2>
          <div class="social-wrapper">
            <a class="social-item icon icon-mail" :href="'mailto:' + author.email" @click.stop></a>
          </div>
          <div class="author-social"></div>
          <p class="author-desc">{{author.description}}</p>
        </div>
      </nuxt-link>
    </ul>
    <div>
      <split-line :icon="'star-fill'" :desc="'友链 (在留言板申请“昵称+链接”)'"></split-line>
      <ul class="friend-wrapper" v-if="friends.length">
        <template v-for="friend in friends">
          <a class="friend-item" :key="friend.id" :href="friend.link" target="_blank">
            <el-avatar
              class="friend-avatar"
              size="large"
              :src="friend.avatar"
            ></el-avatar>
            <span class="friend-name">{{friend.name}}</span>
          </a>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import SplitLine from "@/components/base/split-line/split-line";
import { mapState } from "vuex";

export default {
  name: "about-page",

  components: {
    SplitLine
  },

  head() {
    return {
      title: "关于"
    };
  },

  async fetch({ store, params }) {
    await store.dispatch("about/getAuthors");
    await store.dispatch("blog/getFriends");
  },

  computed: {
    ...mapState({
      authors: state => state.about.authors,
      friends: state => state.blog.friends
    })
  },

  methods: {
 
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixin.scss";

.about-container {
  @include container;
  min-height: 450px;
}

.author-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;

  .author-item {
    @include noCover;
    box-sizing: border-box;
    flex: 1 0 25%;
    max-width: 420px;
    min-width: 290px;
    margin: 15px;
    padding-bottom: 40px;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.25s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
    }

    .author-avatar {
      width: 100%;
      height: 250px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }

    .author-info-wrapper {
      box-sizing: border-box;
      padding: 0 30px;

      .social-wrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .social-item {
          font-size: $title-font-size-base;
          margin-right: 20px;
          transition: color 0.25s ease-in-out;
          cursor: pointer;

          &:last-child {
            margin-right: 0;
          }

          &:hover {
            color: var(--theme-active);
          }

          @media (max-width: 479px) {
            font-size: $title-font-size-small;
          }
        }
      }

      .author-name {
        font-size: $title-font-size-medium;
        font-weight: $font-weight-bold;
        margin: 15px 0;

        @media (max-width: 479px) {
          font-size: $title-font-size-base;
        }
      }

      .author-desc {
        padding: 15px 0;

        @media (max-width: 479px) {
          font-size: $font-size-base;
        }
      }
    }
  }
}

.friend-wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 -5px;

  .friend-item {
    display: flex;
    align-items: center;
    padding: 5px 12px 5px 5px;
    margin: 5px;
    color: var(--font-color-primary);
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
    letter-spacing: 1.5px;
    border-radius: 30px;
    background: var(--tag-color);
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }

    &:hover {
      color: #fff;
      background: var(--theme-active);
      transition: all 0.25s ease-in-out;
    }
    .friend-avatar + .friend-name {
      margin-left: 10px;
    }
  }
}
</style>
