import React from 'react';
import { Newspaper, Users, Share2, MessageCircle, ThumbsUp } from 'lucide-react';

const NewsCommunity: React.FC = () => {
  const news = [
    {
      title: 'Government announces new subsidy for solar pumps',
      source: 'AgriNews',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400&h=250'
    },
    {
      title: 'New wheat variety "Kanak-202" shows 20% higher yield',
      source: 'Farmer Times',
      time: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400&h=250'
    },
    {
      title: 'Monsoon expected to hit North India by next week',
      source: 'Weather Dept',
      time: '1 day ago',
      image: 'https://images.unsplash.com/photo-1514632595863-60838b44744b?auto=format&fit=crop&q=80&w=400&h=250'
    }
  ];

  const posts = [
    {
      author: 'Suresh Singh',
      location: 'Punjab',
      content: 'My mustard crop is showing yellow leaves. Any suggestions for fertilizers?',
      likes: 24,
      comments: 12,
      time: '1 hour ago'
    },
    {
      author: 'Anil Deshmukh',
      location: 'Maharashtra',
      content: 'Successfully harvested 50 quintals of onions today. Market prices are looking good!',
      likes: 156,
      comments: 45,
      time: '3 hours ago'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
          <Newspaper className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">News & Community</h2>
          <p className="text-gray-500 text-sm">Stay informed and connected with fellow farmers.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* News Section */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-500" />
            Latest Agriculture News
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {news.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                <div className="p-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>{item.source}</span>
                    <span>{item.time}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 leading-tight hover:text-blue-600 cursor-pointer">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            Farmer Community
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <textarea 
                placeholder="Share your farm update or ask a question..." 
                className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-green-500 min-h-[100px] resize-none"
              />
              <div className="flex justify-end mt-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors">
                  Post Update
                </button>
              </div>
            </div>

            {posts.map((post, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                    {post.author[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-800">{post.author}</h5>
                    <p className="text-[10px] text-gray-400">{post.location} â€¢ {post.time}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{post.content}</p>
                <div className="flex items-center gap-6 pt-3 border-t border-gray-50">
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCommunity;
