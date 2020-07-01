import { Button, Input } from 'antd'
import Form from 'antd/lib/form/Form'
import Text from 'antd/lib/typography/Text'
import React from 'react'

type PropsType = {
    email: string
    password: string
    changeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
    passwordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    submit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
    err: string | null
}

const SignIn: React.FC<PropsType> = ({
    email,
    password,
    changeEmail,
    passwordChange,
    submit,
    err,
}) => {
    return (
        <Form className="formContainer">
            <div className="">
                <div className="">
                    {' '}
                    <Text>Sing In</Text>
                    <Input
                        type="email"
                        value={email}
                        onChange={changeEmail}
                        placeholder="email"
                    ></Input>
                    <Input
                        type="password"
                        value={password}
                        onChange={passwordChange}
                        placeholder="password"
                    ></Input>
                    <Button onClick={submit} shape="round" type="primary">
                        Sing In{' '}
                    </Button>
                    <Text>{err ? err : ''}</Text>
                </div>
            </div>
        </Form>
    )
}

export default SignIn
