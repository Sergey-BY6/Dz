import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            // 'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test3',
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: any) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {
                // делает студент

                // сохранить пришедшие данные
                // debugger
                console.log(res)
                console.log(params)
                console.log(searchParams)
                if (res) {
                    console.log(res.data.techs)

                    setTechs(res.data.techs)
                    setTotalCount(res.data.totalCount)
                    setLoading(false)

                }
                //
            })
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        // setPage(
        // setCount(
        // sendQuery(
        // setSearchParams(
        //
        console.log(newPage)
        console.log(newCount)

        setPage(newPage)
        setCount(newCount)

        sendQuery({page: newPage, count: newCount, sort})
        // setSearchParams(newPage.toString())
        // setSearchParams(`page=${newPage}&count=${newCount}`)
        setSearchParams({page: newPage.toString(), count: newCount.toString(), sort})

        //

    }

    const onChangeSort = (newSort: string) => {
        // делает студент
        // debugger
        console.log('sortttttt' + ' ' + newSort)

        // const foo = () => newSort
        setSort(newSort)


        setPage(1) // при сортировке сбрасывать на 1 страницу


        sendQuery({page: 1, count: count, sort: newSort})
        setSearchParams({page: page.toString(), count: count.toString(), sort: newSort})

        //
        // if (newSort === '') {
        //     // debugger
        //     console.log(techs)
        // }
        // if (newSort === '1tech') {
        //     // debugger
        //     let copy = techs
        //     sendQuery({page: 1, count: count})
        //     setTechs(copy.sort((a, b) => b.tech.localeCompare(a.tech)))
        //     console.log(copy.sort((a, b) => b.tech.localeCompare(a.tech)))
        // }
        // if (newSort === '0tech') {
        //     // debugger
        //     let copy = techs
        //     setTechs(copy.sort((a, b) => a.tech.localeCompare(b.tech)))
        //     console.log(copy.sort((a, b) => a.tech.localeCompare(b.tech)))
        // }

        // if (sort === "") {
        //     debugger
        //     setTechs(techs.sort((a,b) => b.tech.localeCompare(a.tech)))
        //     console.log(techs.sort((a,b) => b.tech.localeCompare(a.tech)))
        // }
        // if (sort === "1tech") {
        //     debugger
        //     setTechs(techs.sort((a,b) => b.tech.localeCompare(a.tech)))
        //     console.log(techs.sort((a,b) => b.tech.localeCompare(a.tech)))
        // }
        // if (sort === "0tech") {
        //     debugger
        //     setTechs(techs.sort((a,b) => a.tech.localeCompare(b.tech)))
        // }
        // newSort === "1tech" ? techs.sort((a,b) => a.tech.localeCompare(b.tech))
        //     : (newSort === "0tech" ? techs.sort((a,b) => b.tech.localeCompare(a.tech))
        //         : techs.sort((a,b) => a.tech.localeCompare(b.tech)))

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'} className={s.main}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'} className={s.loading}>Loading...</div>}

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15
