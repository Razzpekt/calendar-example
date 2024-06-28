import { cn } from '@/util/cn'
import { Clock } from 'lucide-react'
import { Fragment } from 'react'

export default function Home() {
  const amountPlaces = 20

  const amountHours = 12
  const startHour = 7

  const hours = Array.from({ length: amountHours }, (_, i) => i + startHour)
  const minuteSteps = [0, 15, 30, 45]

  const timeStamps = hours.flatMap((hour) => {
    return minuteSteps.map((minuteStep, idx) => {
      return {
        label: `${hour.toString().padStart(2, '0')}:${minuteStep
          .toString()
          .padStart(2, '0')}`,
        isNewHour: idx === 0,
      }
    })
  })
  const topEntries = [...Array(amountPlaces)].map((_, i) => `Ort ${i + 1}`)

  const appointments = [
    {
      startTime: '08:00',
      duration: 4,
      place: topEntries[0],
      label: 'Test Appointment',
    },
  ]

  return (
    <main className=''>
      <>
        <div className='h-[100svh] overflow-scroll'>
          <div className='flex w-min'>
            <div
              className='sticky left-0 z-50 grid bg-slate-100'
              style={{
                gridTemplateColumns: `56px`,
              }}
            >
              <div className='sticky top-0 z-50 flex h-10 items-center justify-center self-start border-b border-r border-dotted bg-slate-100'>
                <Clock className='h-5 w-5' />
              </div>
              {timeStamps.map((timeStamp, i) => {
                return (
                  <div
                    key={i}
                    className={cn(
                      'sticky top-10 bg-slate-100 flex h-10 w-14 items-center justify-center border-b border-r border-dotted border-neutral-300',
                      timeStamp.isNewHour && 'font-bold'
                    )}
                  >
                    {timeStamp.label}
                  </div>
                )
              })}
            </div>
            <div
              className='grid flex-1'
              style={{
                gridTemplateColumns: `repeat(${topEntries.length}, minmax(175px, 1fr))`,
              }}
            >
              {topEntries.map((label, i) => {
                return (
                  <div
                    key={i}
                    className='sticky top-0 left-14 z-40 flex h-10 flex-1 items-center gap-1 self-start truncate border-b border-r border-dotted bg-slate-100 px-2'
                  >
                    <div className='truncate sticky left-0'>{label}</div>
                  </div>
                )
              })}
              {timeStamps.map((timeStamp, i) => {
                return (
                  <Fragment key={i}>
                    {topEntries.map((label, i2) => {
                      const appointment = appointments.find((app) => {
                        return (
                          app.place === label &&
                          timeStamp.label === app.startTime
                        )
                      })
                      if (appointment) {
                        return (
                          <div className='h-10' key={i2}>
                            <div
                              className='flex justify-center items-center relative z-30 overflow-auto rounded-lg border-b border-dotted border-neutral-400  p-2 shadow-md shadow-neutral-400'
                              style={{
                                backgroundColor: 'lime',
                                //this number needs to fit the height of left entries. currently h-10 = 40px
                                height: 40 * appointment.duration + 'px',
                              }}
                            >
                              {appointment.label}
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div
                            className='flex items-center justify-center h-10 border-b border-dotted border-neutral-300 font-extralight text-gray-400'
                            key={i2}
                          >{`${timeStamp.label} - ${label}`}</div>
                        )
                      }
                    })}
                  </Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </>
    </main>
  )
}
