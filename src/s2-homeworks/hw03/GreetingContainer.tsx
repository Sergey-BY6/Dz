import React, {ChangeEvent, useState} from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'


type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (value: UserType[]) => void // need to fix any
}

export const pureAddUser = (name: any, setError: any, setName: any, addUserCallback: any) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    if (name === "" || typeof(name) === "number" || name.trim().length === 0) {
        setError ("Ошибка! Введите имя!")

    }
    else {
        addUserCallback(name)
        setName("")

    }
}

export const pureOnBlur = (name: any, setError: any) => { // если имя пустое - показать ошибку
    if (name === "" || typeof(name) === "number" || name.trim().length === 0) {
        setError("Ошибка! Введите имя!")
    }
    // else {
    //     return name
    // }

}

export const pureOnEnter = (e: any, addUser: any) => { // если нажата кнопка Enter - добавить
    if (e.key === "Enter") {
        addUser()
    }
    // console.log(e.charCode)
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // need to fix
        console.log(e.currentTarget.value)
        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: any) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length // need to fix
    const lastUserName =  users.length === 0 ? "" : users[users.length - 1].name// need to fix
    // console.log(users[users.length - 1].name)
    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
