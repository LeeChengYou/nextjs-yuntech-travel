/** 
 * @author Cheng You Lee <901126jeff901126@gmail.com>
 */
import Image from "next/image"
export default function CustomCard({item}){
    return(
        <div class="border">
            <Image src={item.Picture.PictureURL1} alt={item.Picture.PictureDescription1}/>
            <div>{item.ScenicSpotName}</div>
        </div>
    ) 
}