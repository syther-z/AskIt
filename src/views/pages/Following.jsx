import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDispatch } from "../../App";
import { setAlertMessage } from "../../controllers/states/slices/alertslice";
import { followHandle } from "../../controllers/helper";


const mockFetchProfiles = async (ids = []) => {
  return ids.map((id) => ({
    id,                                      
    name: id.split("@")[0] || "Anonymous",   
    handle: id,                               
    bio: "",                                  
  }));
};

const FollowingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((s) => s.userDetail);
  const isLogin = user?.email && user.email !== "Login";

  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);        // [{id, name, handle, bio}]
  const [query, setQuery] = useState("");

  // local following state map { id: boolean }, default true for each followed id
  const [followingMap, setFollowingMap] = useState({});
  // initialFollow map so followHandle can compare with original state (always true here)
  const initialFollowMapRef = useRef({});

  useEffect(() => {
    const ids = Array.isArray(user?.following) ? user.following : [];

    if (!isLogin) {
      setLoading(false);
      setProfiles([]);
      setFollowingMap({});
      return;
    }

    setLoading(true);
    (async () => {
      try {
        const list = await mockFetchProfiles(ids);
        setProfiles(list);

        const map = {};
        const initialMap = {};
        ids.forEach((id) => {
          map[id] = true;       // by definition, you follow everyone in this list
          initialMap[id] = true;
        });
        setFollowingMap(map);
        initialFollowMapRef.current = initialMap;
      } catch (e) {
        getDispatch()(
          setAlertMessage({ message: "Failed to load following list", sign: 2 })
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [isLogin, user?.following]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return profiles;
    return profiles.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.handle.toLowerCase().includes(q) ||
        (p.bio || "").toLowerCase().includes(q)
    );
  }, [profiles, query]);

  const handleUnfollow = (id) => {
    if (!isLogin) {
      getDispatch()(setAlertMessage({ message: "You are not logged in", sign: 2 }));
      return;
    }
    setFollowingMap((prev) => {
      const wasFollowing = !!prev[id];
      const next = { ...prev, [id]: !wasFollowing };
      const initialFollow = initialFollowMapRef.current[id]; // always true on this page
      followHandle(true, wasFollowing, id);
      return next;
    });
  };

  if (!isLogin) {
    return (
      <div className="w-full min-h-[var(--min-page-size)] flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to view followed people.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-load-animation w-full min-h-[var(--min-page-size)] flex flex-col items-center p-6">
      <div className="w-full max-w-[800px]">
        <h1 className="text-2xl font-bold mb-4">People You Follow</h1>

        {/* Search */}
        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search followed people..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 bg-gray-200 rounded" />
                    <div className="h-3 w-1/4 bg-gray-200 rounded" />
                  </div>
                  <div className="h-8 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-600">
              {query
                ? "No matches in your followed list."
                : "You are not following anyone yet."}
            </p>
          </div>
        )}

        {/* List */}
        {!loading && filtered.length > 0 && (
          <ul className="space-y-3">
            {filtered.map((p) => {
              const isFollowing = !!followingMap[p.id];
              const initials = (p.name || p.handle || "AN").substring(0, 2).toUpperCase();
              return (
                <li
                  key={p.id}
                  className="bg-white rounded-xl shadow p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold">
                      {initials}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.handle}</div>
                      {p.bio ? <div className="text-sm text-gray-600 mt-1">{p.bio}</div> : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* <button
                      onClick={() => navigate(`/profile/${p.id}`)}
                      className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      View Profile
                    </button> */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnfollow(p.id);
                      }}
                      className={`px-3 py-2 rounded-[7px] font-bold ${
                        isFollowing
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-red-400 text-white hover:bg-red-400"
                      }`}
                      title={isFollowing ? "Unfollow" : "Follow back"}
                    >
                      {isFollowing ? "following" : "Follow"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FollowingPage;
