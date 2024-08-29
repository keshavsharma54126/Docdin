"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FaInstagram,
  FaResearchgate,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Share2,
  Send,
  MoreHorizontal,
  UserPlus,
} from "lucide-react";
import { UserIcon } from "lucide-react";

interface UserData {
  id: string;
  fullName: string;
  imageUrl: string | null;
  designation: string;
}

interface Post {
  id: number;
  content: string;
  author: string;
  authorImage: string | null;
  timestamp: string;
  likes: number;
  comments: number;
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/api/auth/signin");
    } else {
      fetchUserData();
      fetchPosts();
      fetchTrendingTopics();
      setIsLoading(false);
    }
  }, [session, status, router]);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/userInfo");
      const data = await res.json();
      setUserData(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchPosts = async () => {
    // Implement this function to fetch posts from your API
    setPosts([
      {
        id: 1,
        content: "Just published a new research paper on COVID-19 variants!",
        author: "Dr. Jane Doe",
        authorImage: "",
        timestamp: "2 hours ago",
        likes: 45,
        comments: 12,
      },
      {
        id: 2,
        content:
          "Excited to present at the International Cardiology Conference next month!",
        author: "Dr. John Smith",
        authorImage: null,
        timestamp: "5 hours ago",
        likes: 32,
        comments: 8,
      },
      {
        id: 3,
        content:
          "New breakthrough in cancer treatment: immunotherapy shows promising results in clinical trials.",
        author: "Dr. Emily Brown",
        authorImage: null,
        timestamp: "Yesterday",
        likes: 78,
        comments: 25,
      },
    ]);
  };

  const fetchTrendingTopics = async () => {
    // Implement this function to fetch trending topics from your API
    setTrendingTopics([
      "COVID-19 Research",
      "AI in Healthcare",
      "Telemedicine Advancements",
      "Mental Health Awareness",
      "Precision Medicine",
    ]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-1/4">
          <ProfileCard userData={userData} />
          <TrendingSection topics={trendingTopics} />
        </aside>
        <main className="lg:w-1/2">
          <CreatePost />
          <FeedSection posts={posts} />
        </main>
        <aside className="lg:w-1/4">
          <WhoToConnect />
        </aside>
      </div>
    </div>
  );
}

const ProfileCard = ({ userData }: { userData: UserData | null }) => {
  if (!userData) return null;

  return (
    <Card className="mb-6 overflow-hidden">
      <div className="h-24 bg-teal-500"></div>
      <CardContent className="p-4 -mt-12">
        <div className="flex items-end mb-4">
          <Avatar src={userData.imageUrl} name={userData.fullName} size={88} />
          <div className="ml-4 pb-2">
            <h2 className="text-xl font-bold text-black">
              {userData.fullName}
            </h2>
            <p className="text-sm text-gray-600">{userData.designation}</p>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>500+ connections</span>
          <span>50 posts</span>
        </div>
        <Button
          variant="outline"
          className="w-full text-teal-500 border-teal-500 hover:bg-teal-50">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

const CreatePost = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar src={null} name="Your Name" size={48} />
          <input
            type="text"
            placeholder="Share your thoughts..."
            className="flex-grow p-2 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-200 text-black"
          />
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-teal-500">
              <Image src="/image-icon.svg" alt="Image" width={20} height={20} />
            </Button>
            <Button variant="ghost" size="sm" className="text-teal-500">
              <Image src="/gif-icon.svg" alt="GIF" width={20} height={20} />
            </Button>
            <Button variant="ghost" size="sm" className="text-teal-500">
              <Image src="/poll-icon.svg" alt="Poll" width={20} height={20} />
            </Button>
          </div>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FeedSection = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <Avatar src={post.authorImage} name={post.author} size={48} />
                <div className="ml-3">
                  <h3 className="font-semibold text-black">{post.author}</h3>
                  <p className="text-sm text-gray-600">{post.timestamp}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-black mb-3">{post.content}</p>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-600 hover:text-teal-500">
                <ThumbsUp className="h-5 w-5" />
                <span>{post.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-600 hover:text-teal-500">
                <MessageCircle className="h-5 w-5" />
                <span>{post.comments}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-600 hover:text-teal-500">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-600 hover:text-teal-500">
                <Send className="h-5 w-5" />
                <span>Send</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const TrendingSection = ({ topics }: { topics: string[] }) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4 text-black flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-teal-500" /> Trending in
          Medicine
        </h2>
        <ul className="space-y-2">
          {topics.map((topic, index) => (
            <li key={index}>
              <Link
                href={`/topic/${encodeURIComponent(topic)}`}
                className="flex items-center space-x-2 text-black hover:text-teal-500 cursor-pointer py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-2xl text-teal-400">#</span>
                <span>{topic}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const WhoToConnect = () => {
  const suggestions = [
    {
      name: "Dr. Jane Smith",
      specialty: "Cardiology",
      imageUrl: "",
    },
    { name: "Dr. John Doe", specialty: "Neurology" },
    {
      name: "Dr. Emily Brown",
      specialty: "Oncology",
      imageUrl: "",
    },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4 text-black">Who to Connect</h2>
        <ul className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Avatar
                src={suggestion.imageUrl || null}
                name={suggestion.name}
                size={40}
              />
              <div className="flex-grow min-w-0">
                <p className="font-semibold text-black text-sm truncate">
                  {suggestion.name}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {suggestion.specialty}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-teal-500 border-teal-500 hover:bg-teal-50 px-2 py-1 text-xs">
                <UserPlus className="h-3 w-3 mr-1" />
                Connect
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Avatar = ({
  src,
  name,
  size = 48,
}: {
  src: string | null;
  name: string;
  size?: number;
}) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="bg-teal-500 rounded-full flex items-center justify-center text-white"
      style={{ width: `${size}px`, height: `${size}px` }}>
      <UserIcon size={size * 0.6} />
    </div>
  );
};
