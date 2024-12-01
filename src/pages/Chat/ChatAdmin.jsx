import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_API_URL}`);

socket.on('connection', () => {
    console.log('Kết nối thành công');
});

function ChatAdmin() {
    const user = useSelector((state) => state.user);
    const [contacts, setContacts] = useState([]);
    const [activeChat, setActiveChat] = useState(contacts[0]);
    const [chats, setChats] = useState([]);

    const [input, setInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const chatContainerRef = useRef(null);

    const createConversationId = (userId1, userId2) => {
        return `${userId1}-${userId2}`;
    };

    const handleDetailMessage = (id1, id2) => {
        // Gửi sự kiện 'register' cùng với tên người dùng
        socket.emit('register', user?.name);
        // gửi id của user và admin qua server
        socket.emit('DL_idUser_idAdmin', id1, createConversationId(id1, id2));
        // nhận dữ liệu từ server gửi về
        socket.on('DL_detail_message', (DL_detail_message) => {
            // console.log('DL_detail_message', DL_detail_message)
            setChats(Array.isArray(DL_detail_message) ? DL_detail_message : DL_detail_message);
        });

    };
    // console.log('chats', chats)
    // handleDetailMessage(activeChat?.senderId, user?.id)

    useEffect(() => {
        if (user.id !== '') {
            socket.emit('register', user?.name);
            socket.emit('layDL');
            socket.on('DS_user', (TT_DS_user) => {
                // console.log('TT_DS_user', TT_DS_user)
                setContacts(Array.isArray(TT_DS_user) ? TT_DS_user : TT_DS_user);
            });
        }
    }, [user.id]);

    socket.on('DS_user', (TT_DS_user) => {
        setContacts((prevContacts) => [...prevContacts, ...TT_DS_user]);
    });

    // console.log('contacts[0]', contacts[0])
    function formatTimeDifference(timestamp) {
        const now = new Date();
        const then = new Date(timestamp);
        const diffInSeconds = Math.floor((now - then) / 1000); // Đổi chênh lệch thời gian sang giây

        if (diffInSeconds < 60) {
            // Nếu chênh lệch < 1 phút, hiển thị giây
            return `${diffInSeconds} second`;
        }
        const diffInMinutes = Math.floor(diffInSeconds / 60); // Đổi sang phút
        if (diffInMinutes < 60) {
            // Nếu chênh lệch < 1 giờ, hiển thị phút
            return `${diffInMinutes} minute`;
        }
        const diffInHours = Math.floor(diffInMinutes / 60); // Đổi sang giờ
        if (diffInHours < 24) {
            // Nếu chênh lệch < 1 ngày, hiển thị giờ
            return `${diffInHours} hour`;
        }
        const diffInDays = Math.floor(diffInHours / 24); // Đổi sang ngày
        if (diffInDays < 30) {
            // Nếu chênh lệch < 30 ngày, hiển thị ngày
            return `${diffInDays} day`;
        }
        // Nếu đã quá 30 ngày, hiển thị "offline"
        return 'Offline';
    }

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage = {
                conversationId: user?.isAdmin === false
                    ? createConversationId(user?.id, activeChat?.senderId)
                    : createConversationId(activeChat?.senderId, user?.id),
                senderId: user?.id,
                senderName: user?.name,
                senderImage: user?.avatar,
                isAdmin: user?.isAdmin,
                messageContent: input,
            };
            // Gửi sự kiện 'register' cùng với tên người dùng
            socket.emit('registeridUser', newMessage.conversationId);
            // gửi dữ liệu đến server
            socket.emit('sendMessage', newMessage);
            // nhận dữ liệu từ server gửi về
            socket.on('newMessage1', (TinNhanTuServerGuiVe) => {
                console.log('dlmoi', TinNhanTuServerGuiVe)
                setChats([...chats, TinNhanTuServerGuiVe]);
            });
            // nhắn xong reset cái input về rỗng
            setInput('');
        }
    };

    // socket.on('newMessage1', (TinNhanTuServerGuiVe) => {
    //     console.log('dlmoi', TinNhanTuServerGuiVe)
    //     setChats([...chats, TinNhanTuServerGuiVe]);
    // });

    useEffect(() => {
        if (chatContainerRef.current) {
            const lastMessage = chatContainerRef.current.lastElementChild;
            if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [chats]); // Mỗi khi chats thay đổi (khi có tin nhắn mới)



    const switchChat = (contact) => {
        setActiveChat(contact);
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.senderName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hàm xử lý khi nhấn Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    style={styles.searchBox}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div style={styles.contacts}>
                    {filteredContacts.map((contact) => (
                        <div
                            key={contact?._id}
                            style={{
                                ...styles.contact,
                                backgroundColor: activeChat?._id === contact._id ? '#e6f7ff' : 'transparent',
                            }}
                            onClick={() => {
                                switchChat(contact);
                                handleDetailMessage(contact?.senderId, user?.id);
                            }}
                        >
                            <img src={contact.senderImage} alt={contact.senderName} style={styles.avatar} />
                            <div style={{ marginBottom: -8, marginLeft: 4 }}>
                                <strong >{contact.senderName}</strong>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: 200, marginTop: 8 }}>
                                    <p>{contact.lastMessage}</p>
                                    <p style={styles.lastMessage}>{formatTimeDifference(contact.lastMessageAt)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat window */}
            <div style={styles.chatWindow}>
                <div style={styles.chatHeader}>
                    <img src={activeChat?.senderImage} alt={activeChat?.senderName} style={styles.avatar} />
                    <div>
                        <strong>{activeChat?.senderName}</strong>
                        <p style={styles.status}>Vừa truy cập</p>
                    </div>
                </div>
                <div ref={chatContainerRef} style={styles.messages}>
                    {chats.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.message,
                                alignSelf: msg?.isAdmin ? 'flex-end' : 'flex-start',
                                backgroundColor: msg?.isAdmin ? '#dcf8c6' : '#fff',
                            }}
                        >
                            <span >{msg?.messageContent}</span>
                            <span style={styles.timestamp}>{formatTimeDifference(msg?.createdAt)}</span>
                        </div>
                    ))}
                </div>
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder={`Nhập ở đây, tin nhắn tới ${activeChat?.senderName}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        style={styles.input}
                    />
                    <button onClick={handleSendMessage} style={styles.sendButton}>Gửi</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
        width: '300px',
        backgroundColor: '#f0f2f5',
        padding: '10px',
        overflowY: 'auto',
        borderRight: '1px solid #ddd',
    },
    searchBox: {
        width: '100%',
        padding: '10px',
        borderRadius: '20px',
        border: '1px solid #ddd',
        marginBottom: '10px',
    },
    contacts: {
        display: 'flex',
        flexDirection: 'column',
    },
    contact: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid #ddd',
        borderRadius: '5px',
    },
    avatar: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    lastMessage: {
        color: 'gray',
        fontSize: '12px',
    },
    chatWindow: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    chatHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    status: {
        color: 'gray',
        fontSize: '12px',
        marginTop: 5,
    },
    messages: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#e5ddd5',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
    },
    message: {
        maxWidth: '60%',
        padding: '8px 12px',
        borderRadius: '10px',
        marginBottom: '5px',
        fontSize: '14px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timestamp: {
        fontSize: '10px',
        color: 'gray',
        marginTop: '1px',
        textAlign: 'right',
        marginLeft: '10px',
    },
    inputContainer: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ddd',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '20px',
        border: '1px solid #ddd',
        marginRight: '10px',
    },
    sendButton: {
        backgroundColor: '#0084ff',
        color: '#fff',
        border: 'none',
        borderRadius: '20px',
        padding: '8px 16px',
        cursor: 'pointer',
    },
};

export default ChatAdmin;
