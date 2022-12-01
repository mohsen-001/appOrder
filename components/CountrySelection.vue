<template>
  <div class="country_container">
    <div class="slide_label d-flex justify-content-between z-10">
      <span class="label_text">Country</span>
      <div class="arrow">
        <span class="flag-icon flag-icon-gr"></span>
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
    <div class="country" @scroll="touchScroll">
      <div class="slide_wrpr">
        <div
          @click="selectCountry(item.name)"
          class="item mr-3"
          v-for="(item, index) in countries"
          :key="index"
        >
          <div
            :class="` flag ${item.name == selected_country ? 'selected' : ''}`"
            style="position: relative"
          >
            <b-avatar
              variant="primary"
              class="selected-avatar"
              :size="18"
              v-if="item.name == selected_country"
            >
              <i class="fa-solid fa-check small-icon" samll></i
            ></b-avatar>

            <span
              class="flag_img"
              :class="`fi fi-${item.flag} flag-icon `"
            ></span>
            <!-- <img :src="countries[index].flag" alt="image" /> -->
          </div>
          <p :class="item.name == selected_country ? 'country_name' : ''">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "/node_modules/flag-icons/css/flag-icons.min.css";
export default {
  name: "CountrySelection",
  data() {
    return {
      countries: [
        { name: "United Arab Emirates", flag: "ae" },
        { name: "Qatar", flag: "qa" },
        { name: "Kuwait", flag: "kw" },
        { name: "Iraq", flag: "iq" },
      ],
      selected_country: "United Arab Emirates",
      opacityL: 0.2,
      opacityR: 1,
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
    let elem = document.querySelector(".country");
    let elemArr = document.querySelector(".arrow");
    let elemW = elem.scrollWidth;
    let elemC = elem.clientWidth;
    if (elemC >= elemW) {
      elemArr.style.display = "none";
    }
  },

  methods: {
    resizeHandler() {
      this.width = window.innerWidth;
      let elem = document.querySelector(".country");
      let elemArr = document.querySelector(".arrow");
      let elemW = elem.scrollWidth;
      let elemC = elem.clientWidth;
      if (elemC >= elemW) {
        elemArr.style.display = "none";
      } else {
        elemArr.style.display = "block";
      }
    },
    selectCountry(item) {
      if (this.selected_country == item) {
        this.selected_country = null;
        this.$emit("input", "");
      } else {
        this.selected_country = item;
        this.$emit("input", item);
      }
    },

    scrollRight() {
      let elem = document.querySelector(".country");
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
      let elem = document.querySelector(".country");
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
      let elem = document.querySelector(".country");
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

.country_container .label_text {
  font-size: 1.2rem;
  font-weight: bold;
  opacity: 0.8;
}

.country {
  overflow: scroll;
  padding-top: 1rem;
  padding-left: 40px;
  scroll-behavior: smooth;
}

.country .slide_wrpr {
  width: auto;
  display: flex;
  justify-content: start;
  align-items: flex-start;
}

.country .flag {
  width: 90px;
  height: 90px;
  background-color: white;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid transparent;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(128, 128, 128, 0.23);
}

.flag-icon {
  width: 90px;
  height: 100px;
}

.country .flag_img {
  /* width: 150px; */
  transform: scale(1.4);
}

.selected.flag {
  border: 3px solid #115598;
}

.country_name {
  color: #115598;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.item p {
  font-size: 0.8rem;
  margin-top: 10px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.country::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.country {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
.small-icon {
  /* width: 5px;
  height: 10px; */
  font-weight: 100px;
  font-size: 0.97rem;
}
.selected-avatar {
  position: absolute;
  top: 8px;
  z-index: 1000000000;
  text-align: center;
  right: 5px;
  /* padding: 2px; */
  border: 1px solid white;
  /* https://teebalhoor.com/ana-white-collection?bc=MjcxOTE1NzAx&po=ytyghbnj11 */
}
</style>
