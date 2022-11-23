import React, { useState } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import Link from 'next/link'
import { useRouter } from 'next/router'

import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types'
import useAuthStore from '../../store/authStore'

import axios from 'axios'

const Search = ({ videos } : {videos: Video[]}) => {

    console.log(videos);
  const [showAccounts, setShowAccounts] = useState(false)

  const isAccounts = showAccounts ? 'border-b-4 border-black' : 'text-gray-400';
  const isVideos = !showAccounts ? 'border-b-4 border-black' : 'text-gray-400';
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p 
        className={`text-xl font-semibold cursor-pointer mt-2 ${isAccounts}`}
        onClick={() => setShowAccounts(true)}
        >
          Accounts
        </p>
        <p 
        className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
        onClick={() => setShowAccounts(false)}
        >
          Videos
        </p>
        </div>
        {showAccounts ? (
          <div className="md:mt-16">
            {searchedAccounts.length > 0 ? (
                searchedAccounts.map((user: IUser, i: number) => (
                    <Link href={`/profile/${user._id}`} key={i}>
                    <div className="flex gap-3 p-2 cursor-pointer font-semibold
                    rounded border-b-2 border-gray-200">
                        <div>
                          <Image 
                          src={user.image}
                          width={50}
                          height={50}
                          className="rounded-full"
                          alt="user profile"
                          
                          />
                        </div>
                        <div className=" xl:block">
                          <p className="flex gap-1 items-center text-md font-bold 
                          text-primary lowercase">
                            {user.userName.replaceAll(' ', '')}
                            <GoVerified className="text-blue-400" />
                          </p>
                          <p className="capitalize text-gray-400 text-xs">
                            {user.userName}
                          </p>
                        </div>
                    </div>
                  </Link>
                ))
            ) 
            : <NoResults text="" />}
          </div>  
        ) 
        :
        (
          <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
            {videos.length ? 
            (videos.map((video: Video, i:number) => (
              <VideoCard post={video} key={i}/>
            ))

            ) 
            : <NoResults text={`No results for ${searchTerm}`} /> }
          </div>
        )}
    </div>
  )
}

export const getServerSideProps = async ({ params: {searchTerm} } : {params:{searchTerm:string}}) => {
  
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`)
    console.log(res.data)
    return {
      props: { videos: res.data }
    }
  }

export default Search