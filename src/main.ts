import './style.css'

import Alpine from 'alpinejs'
import { createCalendar, viewDay, viewMonthAgenda, viewMonthGrid, viewWeek, viewList } from '@schedule-x/calendar'
import { createIcalendarPlugin } from '@schedule-x/ical'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'

window.Alpine = Alpine

const emptyIcs = "BEGIN:VCALENDAR\nCALSCALE:GREGORIAN\nVERSION:2.0\nPRODID:-//cervical dev//QalCal//EN\nEND:VCALENDAR\n";

const eventModal = createEventModalPlugin()
let icalendarPlugin = createIcalendarPlugin({
	data: emptyIcs
})

const calendar = createCalendar({
	views: [viewWeek, viewMonthAgenda, viewDay, viewMonthGrid, viewList],
	plugins: [icalendarPlugin, eventModal],
	defaultView: viewMonthGrid.name,
	callbacks: {
		onRangeUpdate(range) {
			icalendarPlugin.between(range.start, range.end)
		},
	},
})

calendar.render(document.getElementById('calendar') as any);

Alpine.data("calmeleon", () => ({
	textdata: "",
	loadSample() {
		this.textdata = `BEGIN:VCALENDAR
CALSCALE:GREGORIAN
VERSION:2.0
PRODID:-//cervical dev//QalCal//EN
BEGIN:VEVENT
UID:fd8e9f6b-bcc6-4676-addf-096f910de929
SUMMARY:Wash towels and bath mats
DTSTAMP:20251205T130030Z
DTSTART:20251205T130030Z
DTEND:20251205T133030Z
RRULE:FREQ=WEEKLY
END:VEVENT
BEGIN:VEVENT
UID:dc452e1d-9561-4228-9467-2666c90d24e7
SUMMARY:Vacuum and mop floors
DTSTAMP:20251205T140030Z
DTSTART:20251205T140030Z
DTEND:20251205T143030Z
RRULE:FREQ=WEEKLY
END:VEVENT
BEGIN:VEVENT
UID:74df4122-b694-46d9-86f2-ff521562a56b
SUMMARY:Change bed linen
DTSTAMP:20251205T150030Z
DTSTART:20251205T150030Z
DTEND:20251205T153030Z
RRULE:FREQ=WEEKLY
END:VEVENT
END:VCALENDAR`
		this.updateCalendar();

	},
	updateCalendar() {
		icalendarPlugin = createIcalendarPlugin({
			data: this.textdata ? this.textdata : emptyIcs
		})
		icalendarPlugin.beforeRender(calendar['$app']);
		return;
	}
}));

Alpine.start()


