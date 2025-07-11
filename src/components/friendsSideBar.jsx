function FriendSideBar(){
    const friends = [
      {
        username: "shekhar",
        id: 223,
      },
      {
        username: "karan",
        id: 222,
      },
      {
        username: "harsh",
        id: 221,
      },
      {
        username: "shekhar",
        id: 223,
      },
      {
        username: "karan",
        id: 222,
      },
      {
        username: "harsh",
        id: 221,
      },
      {
        username: "shekhar",
        id: 223,
      },
      {
        username: "karan",
        id: 222,
      },
      {
        username: "harsh",
        id: 221,
      },
      {
        username: "shekhar",
        id: 223,
      },
      {
        username: "karan",
        id: 222,
      },
      {
        username: "harsh",
        id: 221,
      },
      {
        username: "shekhar",
        id: 223,
      },
      {
        username: "karan",
        id: 222,
      },
      {
        username: "harsh",
        id: 221,
      },
      {
        username: "shekhar",
        id: 223,
      },
      {
        username: "karan",
        id: 222,
      },
      {
        username: "harsh",
        id: 221,
      },
    ];
    return (
        <div className="flex flex-1">
      <aside className="w-1/4 h-full bg-gray-100 p-4 border-r border-gray-300">
        <h2 className="text-lg font-semibold mb-4">Friends</h2>
        <ul className="space-y-2">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="p-2 rounded hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectFriend(friend.id)}
            >
              {friend.username}
            </li>
          ))}
        </ul>
      </aside>
      </div >
    );
}
export default FriendSideBar