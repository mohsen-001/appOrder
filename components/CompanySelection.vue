<template>
    <div class="company_container">
        <h5>Company</h5>
        <div class="company">
            <div class="slide_wrpr">

                <div @click="selectCompany(index)" class="item" v-for="(items, index) in companies" :key="index">
                    <div class="flag" :class="index == selected_company? 'selected': ''"><img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                        alt="image">   
                    </div>
                    <p :class="index == selected_company? 'company_name': ''">{{ companies[index] }}</p>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CompanySelection",
    data() {    
        return {
            companies: ["Oredoh", "UaeShopix", "Flaminstore", "Fairyshoping"],
            selected_company: null,
        }
    },


    methods: {
        selectCompany(index){
            this.selected_company = index
            console.log(index);
        }
    }
}
</script>

<style scoped>
.company_container h5 {
    margin-left: 40px;
    
}

.company {
    overflow: scroll;
    padding-left: 40px;
}

.company .slide_wrpr {
    width: 450px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.company .flag {
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

.company .flag img {
    width: 150px;
}


.selected.flag {
    border: 3px solid #115598;
}

.company_name {
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