document.addEventListener("DOMContentLoaded", function() {
    const notificationButton = document.querySelector('.notification-button');
    const notificationIcon = notificationButton.querySelector('img');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    const notificationItems = document.querySelectorAll('.notification-list li');
    const loadMoreButton = document.querySelector('.load-more-notifications');
    const notificationBadge = document.querySelector('.notification-badge'); // 알림 배지

    let newNotificationCount = 0; // 새로운 알림 개수 추적 변수
    let loadMoreClicked = false; // "더보기" 버튼 클릭 여부 추적 변수

    // 알림 버튼 클릭 시 드롭다운 열기/닫기
    notificationButton.addEventListener('click', function() {
        notificationDropdown.classList.toggle('visible');
        if (notificationDropdown.classList.contains('visible')) {
            notificationIcon.src = '/resources/images/notification/clicked-bell-icon.png'; // 아이콘 변경
        } else {
            notificationIcon.src = '/resources/images/notification/bell-icon.png'; // 아이콘 원래대로
        }

        // 드롭다운 열고 닫을 때 "더보기" 버튼 상태를 관리
        if (notificationDropdown.classList.contains('visible') && loadMoreClicked) {
            document.querySelector('.load-more-notifications').style.display = 'block'; // 버튼 보이기
            loadMoreClicked = false; // 클릭 상태 초기화
        }

        // 드롭다운 열고 닫을 때마다 버튼 상태 체크
        checkLoadMoreButtonVisibility(); // 버튼 상태 확인

        // 드롭다운 닫을 때 알림 5개로 제한
        if (!notificationDropdown.classList.contains('visible')) {
            resetNotificationList(); // 드롭다운 닫을 때 알림을 5개로 제한
        }
    });

    // 알림 클릭 시 읽음 처리 및 위치 변경
    notificationItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.stopPropagation(); // 이벤트 전파 중지
            if (this.classList.contains('new-notification')) {
                this.classList.remove('new-notification');
                this.style.fontWeight = 'normal'; // 읽은 알림 글씨 연하게
                updateNotificationOrder(); // 읽은 상태로 변경되면 위치 업데이트

                // 새로운 알림 개수 감소
                newNotificationCount--;
                updateNotificationBadge(); // 배지 업데이트
            }
        });
    });

    // 알림 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', function(event) {
        if (!notificationButton.contains(event.target) && !notificationDropdown.contains(event.target)) {
            notificationDropdown.classList.remove('visible');
            notificationIcon.src = '/resources/images/notification/bell-icon.png'; // 아이콘 원래대로

            // 드롭다운 외부 클릭 시 "더보기" 버튼 상태 체크
            checkLoadMoreButtonVisibility(); // 여기서 상태 체크
        }
    });

    // 알림 삭제 기능
    document.querySelectorAll('.delete-icon').forEach(function(deleteBtn) {
        deleteBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // 이벤트 전파 중지
            const notification = event.target.closest('li'); // 해당 알림 항목 찾기
            if (notification.classList.contains('new-notification')) {
                newNotificationCount--; // 새로운 알림 개수 감소
                updateNotificationBadge(); // 배지 업데이트
            }
            notification.remove(); // 알림 삭제
        });
    });

    // 더보기 버튼 클릭 시 알림 최대 10개까지만 추가
    loadMoreButton.addEventListener('click', function() {
        loadMoreClicked = true; // "더보기" 버튼이 클릭되었음을 추적

        const additionalNotifications = [
            '<li><span>기본 알림 6</span><span class="delete-icon">×</span></li>',
            '<li><span>기본 알림 7</span><span class="delete-icon">×</span></li>',
            '<li><span>기본 알림 8</span><span class="delete-icon">×</span></li>',
            '<li><span>기본 알림 9</span><span class="delete-icon">×</span></li>',
            '<li><span>기본 알림 10</span><span class="delete-icon">×</span></li>'
        ];

        const notificationList = document.querySelector('.notification-list');
        const loadMoreContainer = this.parentElement;
        const currentItems = notificationList.querySelectorAll('li:not(.load-more-container)').length;

        if (currentItems + additionalNotifications.length <= 10) {
            // 추가 알림을 모두 표시
            additionalNotifications.forEach(notificationHTML => {
                loadMoreContainer.insertAdjacentHTML('beforebegin', notificationHTML);
            });

            // 더보기 버튼 숨기기
            this.style.display = 'none';
        } else {
            // 10개를 초과하지 않도록 추가 알림 제한
            const remainingSlots = 10 - currentItems;
            additionalNotifications.slice(0, remainingSlots).forEach(notificationHTML => {
                loadMoreContainer.insertAdjacentHTML('beforebegin', notificationHTML);
            });

            // 더보기 버튼 숨기기
            this.style.display = 'none';
        }

        // 새로 추가된 알림에 대한 이벤트 리스너 설정
        const newItems = notificationList.querySelectorAll('li:not(.load-more-container):not([data-initialized])');
        newItems.forEach(item => {
            item.dataset.initialized = true; // 중복 리스너 방지

            item.addEventListener('click', function() {
                if (!this.classList.contains('new-notification')) {
                    this.style.fontWeight = 'normal'; // 이미 읽은 알림이므로 스타일 변경
                    updateNotificationOrder(); // 읽음 처리 시 위치 변경
                }
            });

            const deleteIcon = item.querySelector('.delete-icon');
            deleteIcon.addEventListener('click', function(event) {
                event.stopPropagation();
                item.remove();
            });
        });

        // 버튼 상태 체크
        checkLoadMoreButtonVisibility();
    });

    // "더보기" 버튼이 안 보이면 다시 표시
    function checkLoadMoreButtonVisibility() {
        const notificationList = document.querySelector('.notification-list');
        const loadMoreButton = document.querySelector('.load-more-notifications');
        
        // 알림이 10개 이상일 경우 더보기 버튼 숨기기
        if (notificationList.querySelectorAll('li:not(.load-more-container)').length >= 10) {
            loadMoreButton.style.display = 'none'; // 10개 이상이면 버튼 숨김
        } else {
            loadMoreButton.style.display = 'block'; // 10개 미만일 경우 버튼 보임
        }
    }

    // 새로운 알림 개수에 따라 알림 배지 업데이트
    function updateNotificationBadge() {
        // 새로운 알림이 있을 때만 배지에 숫자 표시
        if (newNotificationCount > 0) {
            notificationBadge.textContent = newNotificationCount; // 새로운 알림 개수 표시
            notificationBadge.style.display = 'inline-block'; // 배지 보이기
        } else {
            notificationBadge.style.display = 'none'; // 알림 없으면 배지 숨기기
        }
    }

    // 읽음 상태에 따라 알림 순서 업데이트
    function updateNotificationOrder() {
        const notificationList = document.querySelector('.notification-list');
        const notifications = Array.from(notificationList.children);

        // '더보기' 컨테이너는 제외
        const loadMoreContainer = notifications.find(item => item.classList.contains('load-more-container'));
        const filteredNotifications = notifications.filter(item => item !== loadMoreContainer);

        // 새로운 알림과 읽은 알림 분리
        const newNotifications = filteredNotifications.filter(item => item.classList.contains('new-notification'));
        const oldNotifications = filteredNotifications.filter(item => !item.classList.contains('new-notification'));

        // 읽은 알림 최신순으로 정렬
        oldNotifications.sort(function(a, b) {
            return b.dataset.timestamp - a.dataset.timestamp; // 최신순으로 정렬
        });

        // 목록 초기화 후 순서 재조정
        notificationList.innerHTML = ''; // 초기화
        newNotifications.forEach(item => notificationList.appendChild(item));
        oldNotifications.forEach(item => notificationList.appendChild(item));
        if (loadMoreContainer) {
            notificationList.appendChild(loadMoreContainer); // 더보기 버튼 추가
        }
    }

    // 초기 상태에서 새로운 알림 개수 업데이트
    newNotificationCount = document.querySelectorAll('.new-notification').length;
    updateNotificationBadge(); // 초기 배지 업데이트
    
    // "더보기" 버튼이 필요한지 체크
    checkLoadMoreButtonVisibility();
});
