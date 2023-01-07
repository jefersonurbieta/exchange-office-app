<template>
    <v-row justify="center" class="mb-8">
        <v-col cols="12" sm="4" md="3">
            <material-stats-card
                icon="fa-sharp fa-solid fa-wallet"
                title="Lucro do período "
                :value="profit.inPeriod | real"
                sub-icon="mdi-clock"
                sub-text="Just Updated"
            />
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <material-stats-card
                icon="fa-sharp fa-thin fa-star"
                title="Movimentações"
                :value="profit.movementsSize"
                sub-icon="mdi-clock"
                sub-text="Just Updated"
            />
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <material-stats-card
                icon="fa-sharp fa-solid fa-calendar"
                title="Lucro deste mês"
                :value="profit.inMonth | real"
                sub-icon="mdi-clock"
            />
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <material-stats-card
                icon="fa-sharp fa-solid fa-calendar-week"
                title="Média 6 meses"
                :value="profit.average6Months | real"
                sub-icon="mdi-clock"
            />
        </v-col>
    </v-row>
</template>

<script>

export default {
    props: ['profit'],
    data () {
        return {
            headers: [
                {
                    sortable: false,
                    text: 'ID',
                    value: 'id',
                },
                {
                    sortable: false,
                    text: 'Name',
                    value: 'name',
                },
                {
                    sortable: false,
                    text: 'Salary',
                    value: 'salary',
                    align: 'right',
                },
                {
                    sortable: false,
                    text: 'Country',
                    value: 'country',
                    align: 'right',
                },
                {
                    sortable: false,
                    text: 'City',
                    value: 'city',
                    align: 'right',
                },
            ],
            items: [
                {
                    id: 1,
                    name: 'Dakota Rice',
                    country: 'Niger',
                    city: 'Oud-Tunrhout',
                    salary: '$35,738',
                },
                {
                    id: 2,
                    name: 'Minerva Hooper',
                    country: 'Curaçao',
                    city: 'Sinaai-Waas',
                    salary: '$23,738',
                },
                {
                    id: 3,
                    name: 'Sage Rodriguez',
                    country: 'Netherlands',
                    city: 'Overland Park',
                    salary: '$56,142',
                },
                {
                    id: 4,
                    name: 'Philip Chanley',
                    country: 'Korea, South',
                    city: 'Gloucester',
                    salary: '$38,735',
                },
                {
                    id: 5,
                    name: 'Doris Greene',
                    country: 'Malawi',
                    city: 'Feldkirchen in Kārnten',
                    salary: '$63,542',
                },
            ],
            tabs: 0,
            tasks: {
                0: [
                    {
                        text: 'Sign contract for "What are conference organizers afraid of?"',
                        value: true,
                    },
                    {
                        text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
                        value: false,
                    },
                    {
                        text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
                        value: false,
                    },
                    {
                        text: 'Create 4 Invisible User Experiences you Never Knew About',
                        value: true,
                    },
                ],
                1: [
                    {
                        text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
                        value: true,
                    },
                    {
                        text: 'Sign contract for "What are conference organizers afraid of?"',
                        value: false,
                    },
                ],
                2: [
                    {
                        text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
                        value: false,
                    },
                    {
                        text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
                        value: true,
                    },
                    {
                        text: 'Sign contract for "What are conference organizers afraid of?"',
                        value: true,
                    },
                ],
            },
            list: {
                0: false,
                1: false,
                2: false,
            },
        }
    },

    methods: {
        complete (index) {
            this.list[index] = !this.list[index]
        }
    }
}
</script>

<style>
.v-sheet--offset {
    top: -24px;
    position: relative;
}
</style>
