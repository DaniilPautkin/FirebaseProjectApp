import React from 'react'
import ProjectSummary from './ProjectSummary'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import './List.css'
import { ProjectType } from '../../types/types'

type PropsType = {
    projects: Array<ProjectType>
}

const ProjectList: React.FC<PropsType> = ({ projects }) => {
    return (
        <div className="listContainer">
            {projects &&
                projects.map((project: ProjectType) => {
                    return (
                        <NavLink
                            className="list"
                            key={project.id}
                            to={'/project/' + project.id}
                        >
                            <ProjectSummary project={project} />
                        </NavLink>
                    )
                })}
        </div>
    )
}

export default compose(withAuthRedirect)(ProjectList)
