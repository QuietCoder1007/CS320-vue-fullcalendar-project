<template>
    <div>
        <FullCalendar id="app"
            :plugins="calendarPlugins" 
            :header="{
                left: 'title', 
                center: 'prev today next', 
                right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
            }"
            
            :weekends="true"
            :selectable="true"
            :editable="true"
            :events="EVENTS"
            @eventResize="updateEvent"
            @eventDrop="updateEvent"
            @select="handleSelect"
            @eventClick="handleClick"
        />

        <modals-container/>
    </div>
</template>

<script>
require('@fullcalendar/core/main.min.css')
require('@fullcalendar/daygrid/main.min.css')
require('@fullcalendar/timegrid/main.min.css')
require('@fullcalendar/list/main.min.css')

import FullCalendar from '@fullcalendar/vue'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'

import { mapGetters } from "vuex"

import EventModal from './EventModal'
//import CommentsModal from './CommentsModal'

export default {
    data: () => ({
        calendarPlugins: [
            DayGridPlugin,
            TimeGridPlugin,
            InteractionPlugin,
            ListPlugin
        ]
    }),
    components: {FullCalendar},
    computed: {
        ...mapGetters(["EVENTS"])
    },
     methods: {
        // renderEvent(arg){
        //     let span = document.getElement('span')

        //     span.setAttribute('class', 'fa fa-comments')

        //     arg.el.appendChild(span)

        //     span.addEventListener('click', event => {
        //         event.stopPropagation();
        //         this.$modal.show(CommentsModal, {
        //             text: "This is for the comments!"
        //         })
        //     })
        // },
        updateEvent(arg){
            this.$store.commit("UPDATE_EVENT", arg.event)
        },
        handleSelect(arg){
            this.$store.commit("ADD_EVENT", {
                id: (new Date()).getTime(),
                title: 'Event',
                start: arg.start,
                end: arg.end,
                allDay: arg.allDay
            })
        },
        handleClick(arg){
            this.$modal.show(EventModal,{
                text: "This is from the component",
                event: arg.event
            })
        }
    }
}
</script>