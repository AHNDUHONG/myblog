import { projects } from "./mockData";
import ProjectCard from "./ProjectCard"

const ProjectList = () => {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectList;