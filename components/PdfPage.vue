<template>
  <div v-if="form_data.selected_company">
    <div
      v-if="form_data.selected_company.length > 0"
      class="
        fullHeight
        d-flex
        justify-content-start
        align-items-center
        p-5
        position-relative
      "
    >
      <div
        class="
          invoice-header
          d-flex
          justify-content-center
          align-items-center
          mb-5
        "
      >
        <img :src="form_data.selected_company[0].logo" alt="Logo" />
        <p class="mt-3">
          <span class="company-logo text-uppercase">{{
            form_data.selected_company[0].name
          }}</span>
        </p>
      </div>

      <div class="invoice-body w-100">
        <div class="invoice-details d-flex justify-content-between mb-4">
          <div class="invoiceTo d-flex flex-column">
            <span class="opacity font-weight-bold">Invoice to</span>
            <span class="text-uppercase font-weight-bold">{{
              form_data.name
            }}</span>
            <span class="font-weight-bold text-uppercase">{{
              form_data.country
            }}</span>
            <span class="font-weight-light"
              >{{ form_data.city }}, {{ form_data.area }}</span
            >
            <span class="font-weight-light">{{ form_data.number }}</span>
          </div>

          <div class="invoiceNo">
            <span class="text font-weight-bold mb-3 d-block">INVOICE</span>
            <div class="d-flex justify-content-between">
              <span class="opacity">NO.</span>
              <span>{{ form_data.invoice_number }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="opacity">DATE</span>
              <span class="text-uppercase">{{ getDate() }}</span>
            </div>
          </div>
        </div>

        <div class="invoice-table p-3">
          <div class="table_holder">
            <b-table striped :items="form_data.products" :fields="fields">
              <template #cell(product_price)="data">
                {{
                  data.value.product_price
                    ? data.value.product_price
                    : "collection"
                }}
              </template>
              <template #cell(id)="{ index }">
                {{ index + 1 }}
              </template>
            </b-table>
          </div>
        </div>
        <div class="w-100 d-flex justify-content-end mt-5">
          <div class="total-holder p-2">
            <div class="d_fee d-flex justify-content-between p-2 pl-4 pr-4">
              <span class="opacity">Delivery Fee</span>
              <span class="font-weight-bold prm-c"
                >{{ form_data.delivery_fee }} AED</span
              >
            </div>
            <div
              class="d_fee d-flex justify-content-between p-2 pl-4 pr-4"
              v-if="!form_data.price_per_picture"
            >
              <span class="opacity">Selling Price</span>
              <span class="font-weight-bold prm-c"
                >{{ form_data.price }} AED</span
              >
            </div>
            <div class="total d-flex justify-content-between p-2 pl-4 pr-4">
              <span class="opacity">Total</span>
              <span class="font-weight-bold prm-c"
                >{{ getTotalPrice() }} AED</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="inovice-footer text-center position-absolute">
        <div class="text-uppercase">Thank you for choosing us.</div>
        <div class="invoice-contact mt-5">
          <span>{{ form_data.selected_company[0].location }}</span>
          <span>{{ form_data.selected_company[0].email }}</span>
          <span>{{ form_data.selected_company[0].phone }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
export default {
  props: { form_data: Object },
  data() {
    return {
      fields: [
        { key: "id", label: "No" },
        { key: "product_code", label: "Product" },
        { key: "product_quantity", label: "QTY" },
        { key: "product_price", label: "Price" },
      ],
    };
  },
  methods: {
    getDate() {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const d = new Date();
      let month = months[d.getMonth()];
      let day = d.getDate();
      let year = d.getFullYear();
      return month + day + ", " + year;
    },
    downnloadPDF() {
      console.log("download data", this.form_data);
      // const doc = new jsPDF();
      // doc.text("Hello world!", 10, 10);
      // doc.save("a4.pdf")
      const documennt = document.querySelector(".fullHeight");

      var doc = new jsPDF("p", "pt", "A4");
      // doc.html(documennt);
      // doc.save('test.pdf');

      doc.html(documennt, {
        callback: function (doc) {
          doc.save("test.pdf");
        },
        x: 0,
        y: 0,
        width: 793, //target width in the PDF document
        windowWidth: 1058, //window width in CSS pixels
      });
    },
    getTotalPrice() {
      let price = 0;
      if (this.form_data.price_per_picture) {
        this.form_data.products.forEach((row) => {
          price += parseInt(row.product_price);
        });
      } else {
        price = parseInt(this.form_data.price);
      }
      price += parseInt(this.form_data.delivery_fee);
      return price;
    },
  },
};
</script>

<style scoped>
.fullHeight {
  width: 100%;
  max-width: 21cm;
  /* height: 100%; */
  height: 29.7cm;
  overflow-x: hidden;
  background-color: #263342;
  flex-direction: column;
  color: white;
}

.invoice-header {
  flex-direction: column;
}

.invoice-header img {
  width: 150px;
}

.invoice-header p {
  font-weight: 100;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.invoice-header span {
  font-weight: 700;
  font-size: 1.1rem;
}

.invoice-table {
  background-color: #2b3e4c;
  border-radius: 15px;
}

.opacity {
  opacity: 0.4;
}

.invoiceNo .text {
  font-size: 2rem;
  letter-spacing: 6px;
  color: #80cdcf;
}

.total-holder {
  width: 300px;
}

.total {
  background-color: #2b3e4c;
  border-radius: 10px;
}

.prm-c {
  color: #80cdcf;
  font-size: 1rem;
}

.inovice-footer {
  bottom: 0;
}

.inovice-footer div:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.267);
  padding-top: 15px;
}

.invoice-contact {
  background-color: #80cdcf;
  padding: 5px 20px;
  color: #263342;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.invoice-contact span:nth-child(2) {
  margin: 0 30px;
  position: relative;
}

.invoice-contact span:nth-child(2)::before,
.invoice-contact span:nth-child(2)::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border: 1px solid #263342;
  border-radius: 10px;
}

.invoice-contact span:nth-child(2)::before {
  top: 50%;
  left: -23px;
  transform: translateY(-30%);
}

.invoice-contact span:nth-child(2)::after {
  top: 50%;
  right: -23px;
  transform: translateY(-30%);
}
</style>
