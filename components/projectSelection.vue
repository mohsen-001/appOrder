<template>
  <div class="project_container">
    <div class="slide_label d-flex justify-content-between z-10">
      <span class="label_text">Company</span>
      <div class="project_arrow">
        <svg
          :style="{ opacity: opacityL }"
          @click="scrollLeft"
          class="scroll-left mr-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            id="arrow-left"
            d="M-2976-1071h-.036a1.493,1.493,0,0,1-.627-.154h0l-.028-.014h-.007l-.023-.012-.015-.009-.014-.008-.021-.013h-.008l-.025-.016h0l-.028-.019h0a1.5,1.5,0,0,1-.128-.1h0l-.02-.017-.009-.008-.017-.016-.011-.01-.017-.016-.011-.01-.008-.008-10.5-10.5a1.5,1.5,0,0,1,0-2.121,1.5,1.5,0,0,1,2.121,0l7.94,7.94V-1093.5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5v17.378l7.94-7.939a1.5,1.5,0,0,1,2.12,0,1.5,1.5,0,0,1,0,2.121l-10.5,10.5a1.506,1.506,0,0,1-.409.291h0l-.025.011-.017.008-.013.006-.027.011h0a1.493,1.493,0,0,1-.491.108H-2976Z"
            transform="translate(-1071 2987.992) rotate(90)"
            fill="#115598"
          />
        </svg>

        <svg
          :style="{ opacity: opacityR }"
          @click="scrollRight"
          class="scroll right"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            id="arrow-right"
            d="M-2976-1071h-.036a1.493,1.493,0,0,1-.627-.154h0l-.028-.014h-.007l-.023-.012-.015-.009-.014-.008-.021-.013h-.008l-.025-.016h0l-.028-.019h0a1.5,1.5,0,0,1-.128-.1h0l-.02-.017-.009-.008-.017-.016-.011-.01-.017-.016-.011-.01-.008-.008-10.5-10.5a1.5,1.5,0,0,1,0-2.121,1.5,1.5,0,0,1,2.121,0l7.94,7.94V-1093.5a1.5,1.5,0,0,1,1.5-1.5,1.5,1.5,0,0,1,1.5,1.5v17.378l7.94-7.939a1.5,1.5,0,0,1,2.12,0,1.5,1.5,0,0,1,0,2.121l-10.5,10.5a1.506,1.506,0,0,1-.409.291h0l-.025.011-.017.008-.013.006-.027.011h0a1.493,1.493,0,0,1-.491.108H-2976Z"
            transform="translate(1095 -2963.993) rotate(-90)"
            fill="#115598"
          />
        </svg>
      </div>
    </div>

    <div class="project" @scroll="touchScroll">
      <div class="slide_wrpr">
        <div v-if="loading" class="d-flex">
          <div class="loader-div mr-3" v-for="i in 8" :key="i">
            <b-skeleton-img
              no-aspect
              class="skeleton-loader mb-2"
            ></b-skeleton-img>
            <b-skeleton width="70px" height="10px" class="ml-2"></b-skeleton>
          </div>
        </div>

        <div
          v-else-if="items.length > 0"
          @click="handleClick(item, index)"
          class="item mr-3"
          v-for="(item, index) in items"
          :key="index"
        >
          <div
            class="flag p-5"
            :class="item.id == selected_item ? 'selected' : ''"
            style="position: relative"
          >
            <b-avatar
              variant="primary"
              class="selected-avatar"
              :size="18"
              v-if="item.id == selected_item"
            >
              <i class="fa-solid fa-check small-icon" samll></i
            ></b-avatar>
            <img
              class="flag-icon"
              :src="
                item.logo &&
                item.log != 'https://api.teebalhoor.net/public/logo/'
                  ? item.logo
                  : '/logos/fairy.png'
              "
              alt="logo"
            />
          </div>
          <p :class="index == selected_item ? 'project_name' : ''">
            {{ item.name }}
          </p>
        </div>
        <div v-else class="pl-2">No Project Found</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "projectSelection",
  props: {
    items: Array,
    itemValue: String,
    loading: Boolean,
  },
  data() {
    return {
      width: 0,
    };
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  mounted() {
    this.width = window.innerWidth;
    let arrow = document.querySelector(".project_arrow");
    arrow.style.display = "none";
  },
  updated() {
    let elem = document.querySelector(".product_holder");
    let elemArr = document.querySelector(".product_arrow");
    let elemW = elem.scrollWidth;
    let elemC = elem.clientWidth;
    if (elemC >= elemW) {
      elemArr.style.display = "none";
    }
  },
  watch: {
    items: function (item) {
      this.selected_item = null;
    },
  },
  data() {
    return {
      selected_item: null,
      opacityL: 0.2,
      opacityR: 1,
      value: null,
      width: 0,
    };
  },

  methods: {
    resizeHandler() {
      this.width = window.innerWidth;
      let elem = document.querySelector(".project");
      let elemArr = document.querySelector(".project_arrow");
      let elemW = elem.scrollWidth;
      let elemC = elem.clientWidth;
      // console.log(this.width);
      if (elemC >= elemW) {
        elemArr.style.display = "none";
      } else {
        elemArr.style.display = "block";
      }
    },
    handleClick(item, index) {
      if (this.selected_item == item.id) {
        this.selected_item = null;
        this.$emit("input", null);
      } else {
        this.selected_item = item.id;
        this.$emit("input", item.id);
      }

      // return selected record
      this.$root.$emit("msItem", item);
    },
    selectproject(index) {
      this.selected_item = index;
      console.log(index);
    },

    scrollRight() {
      let elem = document.querySelector(".project");
      let elemW = elem.scrollWidth;
      let scrollBottom = elemW - elem.scrollLeft - elem.clientWidth;
      elem.scrollLeft += 180;
      this.opacityL = 1;
      if (scrollBottom <= 180) {
        this.opacityR = 0.2;
        return;
      }
    },

    scrollLeft() {
      let elem = document.querySelector(".project");
      let elemW = elem.scrollWidth;
      let scrollBottom = elemW - elem.scrollLeft - elem.clientWidth;
      elem.scrollLeft -= 180;
      this.opacityR = 1;
      if (elem.scrollLeft <= 180) {
        this.opacityL = 0.2;
        return;
      }
    },

    touchScroll() {
      let elem = document.querySelector(".project");
      let elemW = elem.scrollWidth;
      let scrollBottom = elemW - elem.scrollLeft - elem.clientWidth;

      this.opacityL = 1;
      this.opacityR = 1;

      if (scrollBottom <= 0) {
        this.opacityR = 0.2;
      } else if (elem.scrollLeft <= 0) {
        this.opacityL = 0.2;
      }
    },
  },
};
</script>

<style scoped>
.slide_label svg {
  width: 15px;
}

.slide_label {
  margin: 0 40px;
}

.project_container .label_text {
  font-size: 1.2rem;
  font-weight: bold;
  opacity: 0.8;
  margin-top: unset !important;
  margin: 10px;
}

.project {
  overflow-x: scroll;
  padding-top: 1rem;
  padding-left: 40px;
  scroll-behavior: smooth;
  width: 100%;
}

.project .slide_wrpr {
  width: auto;
  display: flex;
  justify-content: start;
  align-items: center;
}

.project .flag {
  width: 90px;
  height: 90px;
  background-color: white;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(128, 128, 128, 0.23);
  box-sizing: border-box;
}
.flag-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.project .flag img {
  width: 60px;
}

.selected {
  /* border: 3px solid #007bff; */
  outline: solid 3px #115598;
  outline-offset: -3px;
}

.project_name {
  color: #115598;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

.item p {
  font-size: 0.8rem;
  margin-top: 10px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.project::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.project {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.skeleton-loader {
  width: 90px !important;
  height: 90px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}
.small-icon {
  /* width: 5px;
  height: 10px; */
  font-weight: 100px;
  font-size: 0.95rem;
}
.selected-avatar {
  position: absolute;
  top: 8px;
  z-index: 100;
  text-align: center;
  right: 5px;

  border: 1px solid white;
}
</style>
