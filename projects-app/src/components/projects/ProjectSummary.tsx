import React from 'react'
import Text from 'antd/lib/typography/Text'
import './Summary.css'
import moment from 'moment'
import { ProjectType } from '../../types/types'

type PropsType = {
    project: ProjectType
}

const ProjectSummary: React.FC<PropsType> = ({ project }) => {
    return (
        <div>
            <div className="card">
                <Text strong>{project.title}</Text>
                <Text code>Created by {project.authorName}</Text>
                <Text type="secondary">
                    {moment(project.createdAt.toDate()).calendar()}
                </Text>
            </div>
        </div>
    )
}

export default ProjectSummary
