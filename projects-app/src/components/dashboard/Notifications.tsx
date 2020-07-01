import Text from 'antd/lib/typography/Text'
import moment from 'moment'
import React from 'react'
import './Notifications.css'
import { NotificationType } from '../../types/types'

type MapStateProps = {
    notifications: Array<NotificationType>
}

const Notifications: React.FC<MapStateProps> = ({ notifications }) => {
    return (
        <div className="notifications">
            {notifications &&
                notifications.map((n) => (
                    <div key={n.id} className="notification">
                        <Text>{`${n.content} ${n.user}`}</Text>
                        <Text type="secondary">
                            {moment(n.time.toDate()).fromNow()}
                        </Text>
                    </div>
                ))}
        </div>
    )
}

export default Notifications
