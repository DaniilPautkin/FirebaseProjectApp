import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { createProject } from '../../../redux/projectReducer'
import { AppStateType } from '../../../redux/redux-store'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import CreateProject from './CreateProject'
import './Form.module.css'

const CreateProjectContainer: React.FC<PropsType> = ({ createProject }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const clearAllInputs = () => {
        setTitle('')
        setContent('')
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)

    const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setContent(e.target.value)

    const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        createProject(title, content)
        clearAllInputs()
        return <Redirect to="/" />
    }
    return (
        <div>
            <CreateProject
                title={title}
                content={content}
                titleChange={onTitleChange}
                contentChange={onContentChange}
                submit={onSubmit}
            />
        </div>
    )
}

type PropsType = MapDispatchType

type MapDispatchType = {
    createProject: (title: string, content: string) => void
}

export default compose<React.ComponentType>(
    connect<{}, MapDispatchType, {}, AppStateType>(null, { createProject }),
    withAuthRedirect
)(CreateProjectContainer)
