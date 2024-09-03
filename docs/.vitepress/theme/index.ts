// https://vitepress.dev/guide/custom-theme
import { h, nextTick } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import Valine from "valine";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () =>
        h("div", { id: "vcomments", style: "marin-top: 40px" }),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ router }) {
    const initValine = (path) => {
      setTimeout(() => {
        new Valine({
          el: "#vcomments",
          appId: "Xu12KSqQMIYZtj34BY4hHfur-gzGzoHsz",
          appKey: "0d5T2v6IRtb3dRDA2tfGt7Wz",
          placeholder: "填写评论...",
          path: path, // 使用页面的路径作为评论的路径
          // 其他配置选项...
        });
      }, 500); // 延迟500ms执行，确保页面已经加载完毕
    };

    // 在页面首次加载时初始化 Valine
    initValine(router.route.path);

    // 监听路由变化
    router.onAfterRouteChanged = (to) => {
      initValine(to);
    };
  },
} satisfies Theme;
