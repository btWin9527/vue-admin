<template>
  <div>
    <h3>图片裁剪</h3>
    <p>涉及到的属性有width 、height 、overflow 、object-fit 、object-position
      、clip-path 、mask 、clip() 和 object-view-box </p>

    <h4>使用clip-path裁剪</h4>
    <div class="clip-container">
      <div class="box" style="--clip-path:inset(20px 20px 50px)"></div>
      <div class="box"
           style="--clip-path:inset(20px 20px 50px round 15px)"></div>
      <div class="box" style="--clip-path:circle(80px at 50% 50%)"></div>
      <div class="box" style="--clip-path:ellipse(100px 80px at center)"></div>
      <div class="box"
           style="--clip-path:polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)"></div>
    </div>

    <h4>clip-path配合动画效果</h4>
    <figure class="zoom-in">
      <img src="https://picsum.photos/800/600?random=1" alt="">
      <span>Zoom In</span>
    </figure>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* 裁剪类 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.clip-container {
  width: 100%;
  min-height: 200px;
  font-family: "Exo", "Bungee Shade", cursive, Arial, sans-serif;
  background-color: #557;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100% - 2rem, 300px), 1fr));
  gap: 2rem;
  place-content: center;
  padding: 1rem;
}


.box {
  --clip-path: inset(20px 20px 50px);
  clip-path: var(--clip-path);
  aspect-ratio: 16 / 9;
  background-color: #77cce9;
  border-radius: 12px;
}

/* 动画交互效果类 */
figure {
  margin: 0;
  padding: 0;
  display: grid;
  border-radius: 8px;
  aspect-ratio: 16 / 9;
  background-color: #3b3e46;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.02), inset 0 0px 0px 1px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  width: 200px;
}

figure > *,
figure::after {
  grid-area: 1 / 1 / -1 / -1;
}

figure img {
  z-index: 1;
  width: 200px;
}

figure::after {
  content: "";
  background-color: #3b3e46;
  border-radius: 8px;
  z-index: 2;
  clip-path: inset(0% 0% 0% 0%);
  transition: all .2s linear;
}


.zoom-in:hover::after {
  clip-path: inset(50% 50% 50% 50%);
}
</style>
