<template>
  <transition name="slide-up">
    <div v-if="isShowScroll" class="scroll-btn" @click="scrollTop">
      <i class="icon el-icon-arrow-up"></i>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isShowScroll: false
    };
  },

  methods: {
    scrollTop() {
      let timer = null;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        let top = document.body.scrollTop || document.documentElement.scrollTop;
        if (top > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            top - 150;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    }
  },

  mounted() {
    function getScrollTop() {
      let scrollTop = 0;
      let bodyScrollTop = 0;
      let documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    }

    window.addEventListener("scroll", () => {
      if (getScrollTop() * 2 > window.innerWidth) {
        this.isShowScroll = true;
      } else {
        this.isShowScroll = false;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/animation.scss";

.scroll-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 5px;
  bottom: 12%;
  width: 40px;
  height: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background-color: var(--app-background-color);
  cursor: pointer;
  z-index: $index-popper;
  .icon {
    font-weight: 700;
    transition: color 0.4s ease;
    font-size: 18px;
  }
  &:hover {
    .icon{
      color: var(--theme-active);
    }
  }
}
</style>
