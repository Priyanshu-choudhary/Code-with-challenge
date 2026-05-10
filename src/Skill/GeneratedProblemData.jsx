const sampleData = [
    {
        name: 'New Problem: Reverse a Linked List',
        children: [
            {
                id: 'dsa001',
                title: 'Reverse a Linked List',
                description: 'Reverse a singly linked list in-place.',
                Example: 'Input: 1->2->3->4->5->NULL, Output: 5->4->3->2->1->NULL',
                difficulty: 'Medium',
                solution: {
                    java: {
                        solution: 'public ListNode reverseList(ListNode head) { ListNode prev = null; while (head != null) { ListNode next = head.next; head.next = prev; prev = head; head = next; } return prev; }'
                    },
                    python: {
                        solution: 'def reverseList(head): prev = None while head: next_node = head.next head.next = prev prev = head head = next_node return prev'
                    },
                    cpp: {
                        solution: 'ListNode* reverseList(ListNode* head) { ListNode* prev = nullptr; while (head) { ListNode* next = head->next; head->next = prev; prev = head; head = next; } return prev; }'
                    },
                }
            }
        ]
    },
    {
        name: 'New Problem: Find the Maximum Subarray Sum',
        children: [
            {
                id: 'dsa002',
                title: 'Find the Maximum Subarray Sum',
                description: 'Given an integer array, find the contiguous subarray which has the largest sum.',
                Example: 'Input: [-2,1,-3,4,-1,2,1,-5,4], Output: 6 (subarray [4,-1,2,1])',
                difficulty: 'Easy',
                solution: {
                    java: {
                        solution: 'public int maxSubArray(int[] nums) { int maxSum = nums[0]; int currentSum = maxSum; for (int i = 1; i < nums.length; i++) { currentSum = Math.max(nums[i], currentSum + nums[i]); maxSum = Math.max(maxSum, currentSum); } return maxSum; }'
                    },
                    python: {
                        solution: 'def maxSubArray(nums): max_sum = nums[0] curr_sum = max_sum for num in nums[1:]: curr_sum = max(num, curr_sum + num) max_sum = max(max_sum, curr_sum) return max_sum'
                    },
                    cpp: {
                        solution: 'int maxSubArray(vector<int>& nums) { int maxSum = nums[0]; int currentSum = maxSum; for (int i = 1; i < nums.size(); i++) { currentSum = max(nums[i], currentSum + nums[i]); maxSum = max(maxSum, currentSum); } return maxSum; }'
                    },
                }
            }
        ]
    },
];

