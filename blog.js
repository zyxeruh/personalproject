let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

const blogForm = document.getElementById('blogForm');
const postsContainer = document.getElementById('postsContainer');

function createBlogPost(username, title, content, mediaUrl = null, mediaType = null) {
    const post = {
        id: Date.now(),
        username,
        title,
        content,
        mediaUrl,
        mediaType,
        date: new Date().toLocaleDateString(),
    };
    
    blogPosts.unshift(post);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    displayPosts();
}

function displayPosts() {
    postsContainer.innerHTML = '';
    
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post animate__animated animate__fadeIn';
        
        let mediaHtml = '';
        if (post.mediaUrl) {
            mediaHtml = `
                <div class="media-container">
                    ${post.mediaType === 'video' 
                        ? `<video controls>
                            <source src="${post.mediaUrl}" type="video/mp4">
                            Your browser does not support the video tag.
                           </video>`
                        : `<img src="${post.mediaUrl}" alt="${post.title}">`
                    }
                    <span class="media-type">${post.mediaType === 'video' ? 'Video' : 'Image'}</span>
                </div>
            `;
        }
        
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            ${mediaHtml}
            <p>${post.content}</p>
            <div class="post-meta">
                <span>Posted by ${post.username}</span>
                <span> • </span>
                <span>${post.date}</span>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

function isVideo(file) {
    return file.type.startsWith('video/');
}


blogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const mediaFile = document.getElementById('media').files[0];
    
    let mediaUrl = null;
    let mediaType = null;
    
    if (mediaFile) {
        try {
            mediaUrl = await convertMediaToBase64(mediaFile);
            mediaType = isVideo(mediaFile) ? 'video' : 'image';
        } catch (error) {
            console.error('Error processing media:', error);
            alert('Error processing media. Please try again.');
            return;
        }
    }
    
    createBlogPost(username, title, content, mediaUrl, mediaType);
    
    blogForm.reset();
});

function convertMediaToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

displayPosts();

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
}); 