import { Button, Input } from 'antd'
import Form from 'antd/lib/form/Form'
import Text from 'antd/lib/typography/Text'
import React from 'react'

type PropsType = {
    err: string | null
    email: string
    password: string
    authorName: string
    emailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    authorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    submit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const SignUp: React.FC<PropsType> = ({
    err,
    email,
    password,
    authorName,
    emailChange,
    passwordChange,
    authorNameChange,
    submit,
}) => {
    return (
        <Form className="formContainer">
            <div className="">
                {' '}
                <Text>Sing Up</Text>
                <Input
                    value={authorName}
                    type="authorName"
                    onChange={authorNameChange}
                    placeholder="name"
                ></Input>
                <Input
                    value={email}
                    type="email"
                    onChange={emailChange}
                    placeholder="email"
                ></Input>
                <Input
                    value={password}
                    type="password"
                    onChange={passwordChange}
                    placeholder="password"
                ></Input>
                <Button onClick={submit} shape="round" type="primary">
                    Sing Up{' '}
                </Button>
                {err ? err : ''}
            </div>
        </Form>
    )
}

export default SignUp
