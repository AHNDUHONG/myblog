import BoardItem from "./BoardItem"
import { mockPosts } from "./mockData"

const BoardList = () => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {mockPosts.map((post) => (
                <BoardItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default BoardList;