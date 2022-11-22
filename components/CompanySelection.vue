<template>
  <div class="company_container">
    <div class="slide_label d-flex justify-content-between z-10">
      <span class="label_text">Company</span>
      <div class="arrow">
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
    <div class="company" @scroll="touchScroll">
      <div class="slide_wrpr">
        <div
          @click="selectcompany(index)"
          class="item mr-3"
          v-for="(items, index) in companies"
          :key="index"
        >
          <div
            class="flag"
            :class="index == selected_company ? 'selected' : ''"
          >
            <img
              :src="companies[index].logo"
              alt="image"
            />
          </div>
          <p :class="index == selected_company ? 'company_name' : ''">
            {{ companies[index].name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "companySelection",
  data() {
    return {
      companies: [
        { name: "Fairyshopping", logo: "/logos/fairy.png" },
        { name: "Flaminstore", logo: "/logos/flaminstore.png" },
        { name: "UAE Shopix", logo: "/logos/oredoh.png" },
        { name: "Oredoh", logo: "/logos/teebalhoor.png" },
      ],
      selected_company: null,
      opacityL: 0.2,
      opacityR: 1,
    };
  },

  methods: {
    selectcompany(index) {
      this.selected_company = index;
      console.log(index);
    },

    scrollRight() {
      let elem = document.querySelector(".company");
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
      let elem = document.querySelector(".company");
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
      let elem = document.querySelector(".company");
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

.company_container .label_text {
  font-size: 1.2rem;
  font-weight: bold;
  opacity: 0.8;
}

.company {
  overflow-x: scroll;
  padding-top: 1rem;
  padding-left: 40px;
  scroll-behavior: smooth;
}

.company .slide_wrpr {
  width: auto;
  display: flex;
  justify-content: start;
  align-items: center;
}

.company .flag {
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

.company .flag img {
  width: 60px;
}

.selected.flag {
  border: 3px solid #007bff;
}

.company_name {
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
.company::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.company {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
