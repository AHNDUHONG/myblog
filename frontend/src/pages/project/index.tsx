import ProjectList from "@/features/project/ProjectList"

const ProjectPage = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">프로젝트 소개</h1>
            <ProjectList />
        </div>
    );
};

export default ProjectPage;