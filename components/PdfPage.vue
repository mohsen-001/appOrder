<template>
    <div class="fullHeight d-flex justify-content-start align-items-center p-5 position-relative">
        <div class="invoice-header d-flex justify-content-center align-items-center mb-5">
            <img src="../static/logos/flaminstore.png" alt="Logo">
            <p class="mt-3"><span class="company-logo">{{ inovice_owner.toUpperCase() }}</span>.COM</p>
        </div>

        <div class="invoice-body w-100">
            <div class="invoice-details d-flex justify-content-between mb-4">
                <div class="invoiceTo d-flex flex-column">
                    <span class="opacity font-weight-bold">Invoice to</span>
                    <span class="text-uppercase font-weight-bold">Omar Murshid Bandar</span>
                    <span class="font-weight-bold">UAE</span>
                    <span class="font-weight-light">Sharja, Alazrah</span>
                    <span class="font-weight-light">00971562876382</span>
                </div>

                <div class="invoiceNo">
                    <span class="text font-weight-bold mb-3 d-block">INVOICE</span>
                    <div class="d-flex justify-content-between">
                        <span class="opacity">NO.</span>
                        <span>002345</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="opacity">DATE</span>
                        <span>JAN 25, 2022</span>
                    </div>
                </div>
            </div>

            <div class="invoice-table p-3">
                <div class="table_holder">
                    <b-table striped :items="items"></b-table>
                </div>
            </div>
            <div class="w-100 d-flex justify-content-end mt-5">
                <div class="total-holder p-2">
                    <div class="d_fee d-flex justify-content-between p-2 pl-4 pr-4">
                        <span class="opacity">Delivery Fee</span>
                        <span class="font-weight-bold prm-c">$ 15.00</span>
                    </div>
                    <div class="total d-flex justify-content-between p-2 pl-4 pr-4">
                        <span class="opacity">Total</span>
                        <span class="font-weight-bold prm-c">$ 315.00</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="inovice-footer text-center position-absolute">
            <div class="text-uppercase">Thank you for choosing us.</div>
            <div class="invoice-contact mt-5">
                <span>Ajman, Freez zone</span>
                <span>info@magicstyle.com</span>
                <span>00971562876382</span>
            </div>
        </div>
    </div>
</template>
  
<script>
import { jsPDF } from "jspdf";
export default {
    data() {
        return {
            inovice_owner: 'flaminstore',
            logo: '',
            items: [
                { No: 1, Product: 'Product Description goes here', QTY: '2', price: '$ 100.00' },
                { No: 2, Product: 'Product Description goes here', QTY: '1', price: '$ 100.00' },
                { No: 3, Product: 'Product Description goes here', QTY: '3', price: '$ 100.00' },
            ]
        }
    },
    methods: {
        generateIt() {
            // const doc = new jsPDF();
            // doc.text("Hello world!", 10, 10);
            // doc.save("a4.pdf")
            const documennt = document.querySelector('.fullHeight');

            var doc = new jsPDF('p', 'pt', 'A4');
            // doc.html(documennt);
            // doc.save('test.pdf');

            doc.html(documennt, {
                callback: function (doc) {
                    doc.save('test.pdf');
                },
                x: 0,
                y: 0,
                width: 793, //target width in the PDF document
                windowWidth: 1058 //window width in CSS pixels
            });
        }
    }

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
    background-color: #2B3E4C;
    border-radius: 15px;
}

.opacity {
    opacity: 0.4;
}

.invoiceNo .text {
    font-size: 2rem;
    letter-spacing: 6px;
    color: #80CDCF;
}

.total-holder {
    width: 250px;
}

.total {
    background-color: #2B3E4C;
    border-radius: 10px;
}

.prm-c {
    color: #80CDCF;
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
    background-color: #80CDCF;
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
    content: '';
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
  