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
          @click="selectCountry(index)"
          class="item mr-3"
          v-for="(items, index) in countries"
          :key="index"
        >
          <span
            :class="`fi fi-ae flag ${
              index == selected_country ? 'selected' : ''
            }`"
          ></span>
          <!-- <img :src="countries[index].flag" alt="image" /> -->

          <p :class="index == selected_country ? 'country_name' : ''">
            {{ countries[index].name }}
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
        { name: "United Arab Emirates", flag: "https://tinyurl.com/4b8wjs3p" },
        { name: "Iran", flag: "https://tinyurl.com/4b8wjs3p" },
        { name: "America", flag: "https://tinyurl.com/4b8wjs3p" },
        { name: "United State", flag: "https://tinyurl.com/4b8wjs3p" },
      ],
      selected_country: null,
      opacityL: 0.2,
      opacityR: 1,
    };
  },

  methods: {
    selectCountry(index) {
      this.selected_country = index;
      console.log(index);
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
  align-items: center;
}

.country .flag {
  width: 90px;
  height: 90px;
  background-color: white;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(128, 128, 128, 0.23);
}

.country .flag img {
  width: 150px;
}

.selected.flag {
  border: 3px solid #007bff;
}

.country_name {
  color: #007bff;
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
</style>
