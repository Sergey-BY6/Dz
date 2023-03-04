import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const startDisabled = timerId !== undefined
    const stopDisabled = timerId === undefined

    const start = () => {
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
        let tmId = +setInterval(()=> setDate(new Date()), 1000)
        setTimerId(tmId)
    }

    const stop = () => {
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
        clearInterval(timerId)
        setTimerId(undefined)
        console.log(timerId)
    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
        setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)
    }

    const formatterTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    });

    const formatterDateDay = new Intl.DateTimeFormat('en-US', {day: '2-digit'}).format(date)
    const formatterDateMonth = new Intl.DateTimeFormat('en-US', {month: '2-digit'}).format(date)
    const formatterDateYear = new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(date)
    const formatterDate = `${formatterDateDay}.${formatterDateMonth}.${formatterDateYear}`

    const formatterDay = new Intl.DateTimeFormat('en-US', {weekday: 'long'});

    const formatterMonth = new Intl.DateTimeFormat('en-US', {month: 'long'});



    const stringTime = formatterTime.format(date) || <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringDate = formatterDate || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const stringDay = formatterDay.format(date) || <br/> // пишут студенты
    const stringMonth = formatterMonth.format(date) || <br/> // пишут студенты



    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={startDisabled} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                    style={{width: "90px"}}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={stopDisabled} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                    style={{width: "90px"}}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
