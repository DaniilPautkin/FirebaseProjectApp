import { Button, Input } from 'antd'
import Form from 'antd/lib/form/Form'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import './Form.module.css'

const CreateProject: React.FC<PropsType> = ({
    title,
    content,
    titleChange,
    contentChange,
    submit,
}) => {
    return (
        <div>
            <Form className="formContainer">
                <Text>Create</Text>
                <Input
                    value={title}
                    onChange={titleChange}
                    placeholder="Title"
                ></Input>
                <Input
                    value={content}
                    onChange={contentChange}
                    placeholder="Description"
                ></Input>
                <Button onClick={submit} shape="round">
                    Create
                </Button>
            </Form>
        </div>
    )
}

type MapStatePropsType = {
    title: string
    content: string
}

type MapDispatchPropsType = {
    titleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    contentChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    submit: (e: React.MouseEvent<HTMLInputElement>) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

export default CreateProject
