import { Project } from "./mockData";

interface Props {
    project: Project;
}

const ProjectCard = ({ project }: Props) => {
    return (
        <div className="border p-4 rounded-lg shadow hover:shadow-md transition space-y-2">
            <h2 className="text-xl font-bold">{project.name}</h2>
            <p className="text-gray-600">{project.description}</p>
            <div className="flex flex-wrap gap-2 text-sm tet-white">
                {project.techStack.map((tech) => (
                    <span key={tech} className="bg-blue-500 px-2 px-2 py-1 rounded">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex gap-4 mt-2 text-blue-600 text-sm">
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        GitHub
                    </a>
                )}
                {project.demo && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Demo
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;