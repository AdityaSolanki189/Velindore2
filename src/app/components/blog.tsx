import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser, faComment, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface BlogProps {
  date?: string;
  author?: string;
  comments?: string;
  image?: string;
}

const Blog = ({ 
  date = "18 July 2025", 
  author = "Admin", 
  comments = "0 comments", 
  image = "/assets/bed room.jpg" 
}: BlogProps) => {
  // Function to truncate author name if it exceeds 10 characters
  const formatAuthorName = (name: string) => {
    if (name.length > 10) {
      return name.substring(0, 10) + '...';
    }
    return name;
  };

  return (
    <div className="blog-card mb-10">
      <div className="m-5">
        <div className="">
          <img src={image} alt="Blog image" className="w-[400px] h-[400px] object-cover" />
        </div>

        <div className="flex items-center gap-6 p-4 w-auto">
  <div className="flex items-center gap-2 whitespace-nowrap">
    <FontAwesomeIcon icon={faCalendar} style={{ color: "#000000" }} />
    <p className="text-gray-700 text-sm">{date}</p>
  </div>

  <div className="flex items-center gap-2 whitespace-nowrap">
    <FontAwesomeIcon icon={faUser} style={{ color: "#000000" }} />
    <p className="text-gray-700 text-sm">{formatAuthorName(author)}</p>
    </div>

  <div className="flex items-center gap-2 whitespace-nowrap">
    <FontAwesomeIcon icon={faComment} style={{ color: "#000000" }} />
    <p className="text-gray-700 text-sm">{comments}</p>
  </div>
</div>


        <div className="text-black">
          <h2 className="text-lg font-semibold">Lorem ipsum dolor sit amet consectetur.</h2>
          <p className="text-gray-700 text-sm mt-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum incidunt fugit dolorem commodi possimus.</p>
          
          <div className="mt-5">
            <a href="#" className="inline-flex items-center gap-2 hover:underline">
              Read More <FontAwesomeIcon icon={faArrowRight} style={{color: "#000000"}} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;