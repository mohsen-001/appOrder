<template>
    <div class="country_container">
        <h4>Country</h4>
        <div class="country">
            <div class="slide_wrpr">

                <div @click="selectCountry(index)" class="item" v-for="(items, index) in countries" :key="index">
                    <div class="flag" :class="index == selected_country? 'selected': ''"><img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                        alt="image">   
                    </div>
                    <p :class="index == selected_country? 'country_name': ''">{{ countries[index] }}</p>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CountrySelection",
    data() {    
        return {
            countries: ["Afghanistan", "pak", "iran", "america"],
            selected_country: null,
        }
    },


    methods: {
        selectCountry(index){
            this.selected_country = index
            console.log(index);
        }
    }
}
</script>

<style scoped>
.country_container h4 {
    margin-left: 40px;
    
}

.country {
    overflow: scroll;
    padding-left: 40px;
}

.country .slide_wrpr {
    width: 450px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.country .flag {
    width: 100px;
    height: 100px;
    background-color: antiquewhite;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-right: 10px; */
    border-radius: 10px;
}

.country .flag img {
    width: 150px;
}


.selected.flag {
    border: 3px solid #115598;
}

.country_name {
    color: #115598;
}

/* .selected p {
    color: blue;
} */


.item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.item p{
    font-weight: 500;
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