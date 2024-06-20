/** 
 * @author Cheng You Lee <901126jeff901126@gmail.com>
 */
import Image from "next/image";

export default function CustomCard({ item }) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg border m-4 bg-white transition-transform transform hover:scale-105">
      <img
        src={item.Picture.PictureUrl1}
        alt={item.Picture.PictureDescription1}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{item.ScenicSpotName}</div>
        <p className="text-gray-700 text-base">
          {item.DescriptionDetail}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
          Read more
          <svg className="-mr-1 ml-2 h-4 w-4 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
