export const departments = ["HR", "Design", "Engineering"].sort();

export const positions = [
    "SDE-1",
    "SDE-2",
    "SDE-3",
    "UI/UX Designer",
    "Product Designer",
    "Product Manager",
    "Team Lead",
    "HR Manager",
    "Head of Staff/HR",
    "Head of Design",
    "Head of Engineering",
].sort();

export const execution = {
    1: ["Head of Staff/HR", "Head of Design", "Head of Engineering", "Product Manager"],
    2: ["Team Lead"],
    3: ["SDE-1", "SDE-2", "SDE-3", "UI/UX Designer", "Product Designer", "HR Manager"],
}

export const positionsByDepartment = {
    HR: ["HR Manager", "Head of Staff/HR", "Team Lead"],
    Design: ["UI/UX Designer", "Product Designer", "Head of Design", "Team Lead"],
    Engineering: ["SDE-1", "SDE-2", "SDE-3", "Team Lead", "Head of Engineering", "Product Manager"],
}



// Company structure with departments and linked team IDs
export const company_db = {
    id: 1,
    name: "John Doe",
    position: "CEO",
    departments: [
        {
            id: 5335,
            department: "HR",
            position: "Head of Staff/HR",
            employee_detail: 'luwople0oil',
            teams: ["luwl72rp8gt"],
        },
        {
            id: 5336,
            department: "Design",
            position: "Head of Design",
            employee_detail: 'luw5n12ph9x',
            teams: ["luwnelxo29h"],
        },
        {
            id: 5337,
            department: "Engineering",
            position: "Head of Engineering",
            employee_detail: 'luwhk7wqflx',
            teams: ["luwbosdm7xk", "luww6cayk13"],
        },
    ],
};

// Team structure with team leads and members
export const teams_db = [
    {
        id: "luwl72rp8gt",
        name: "HR Team",
        team_lead: "luw4el2azpo",
        team_members: ["luw5n2ph9c", "luwp0lnpgwu"]
    },
    {
        id: 'luwnelxo29h',
        name: "Design Team",
        team_lead: "luw8xyi9m6d",
        team_members: ["luwbo8m2azk", "luwe8w406dl", "luw4qktda47"],
    },
    {
        id: 'luwbosdm7xk',
        name: "Engineering Frontend Team",
        team_lead: "luw5m6574nq",
        team_members: ["luw2pu0073h", "luwrle94yht"],
    },
    {
        id: 'luww6cayk13',
        name: "Engineering DevOps Team",
        team_lead: "luw7q2le7vb",
        team_members: ["luws9u3br79"],
    }
];

// Employee details
export const employee_db = [
    {
        employee_id: "luwbo8m2azk",
        name: "Alex",
        email: "bhixr@gmail.com",
        phone: "8641070723",
        position: "Product Designer",
        department: "Design",
        level: 3
    },
    {
        employee_id: "luwx3m4dqyv",
        name: "John Martin",
        email: "ekqug@gmail.com",
        phone: "3728059191",
        position: "SDE-1",
        department: "Engineering",
        level: 3
    },
    {
        employee_id: "luwople0oil",
        name: "Sophia Loren",
        email: "oimpu@gmail.com",
        phone: "4882105727",
        position: "Head of Staff/HR",
        department: "HR",
        level: 1
    },
    {
        employee_id: "luwp0lnpgwu",
        name: "Oscar Wilde",
        email: "oxdcv@gmail.com",
        phone: "1510030047",
        position: "HR Manager",
        department: "HR",
        level: 3
    },
    {
        employee_id: "luw8xyi9m6d",
        name: "Harper Lee",
        email: "kxkjw@gmail.com",
        phone: "4242885444",
        position: "Team Lead",
        department: "Design",
        level: 2
    },
    {
        employee_id: "luw5n12ph9x",
        name: "Thomas Edison",
        email: "cdcqc@gmail.com",
        phone: "0190232034",
        position: "Head of Design",
        department: "Design",
        level: 1
    },
    {
        employee_id: "luwe8w406dl",
        name: "Thomas Edison",
        email: "rvkhr@gmail.com",
        phone: "6885563190",
        position: "UI/UX Designer",
        department: "Design",
        level: 3
    },
    {
        employee_id: "luw2pu0073h",
        name: "Andrew",
        email: "xlepj@gmail.com",
        phone: "2960246695",
        position: "SDE-2",
        department: "Engineering",
        level: 3
    },
    {
        employee_id: "luwrhog5q89",
        name: "Emma Watson",
        email: "eafdx@gmail.com",
        phone: "7705332884",
        position: "Team Lead",
        department: "Design",
        level: 2
    },
    {
        employee_id: "luwltbgb1dy",
        name: "John Smith ",
        email: "nyomi@gmail.com",
        phone: "0304838562",
        position: "Product Designer",
        department: "Design",
        level: 3
    },
    {
        employee_id: "luw6txp5e6m",
        name: "Oscar Wilde",
        email: "shulp@gmail.com",
        phone: "7745030895",
        position: "SDE-2",
        department: "Engineering",
        level: 3
    },
    {
        employee_id: "luwqkob8oqm",
        name: "Liam Neeson",
        email: "pwhix@gmail.com",
        phone: "0401149832",
        position: "SDE-3",
        department: "Engineering",
        level: 3
    },
    {
        employee_id: "luwieytuf58",
        name: "Amelia Earhart",
        email: "mrtjf@gmail.com",
        phone: "3572321345",
        position: "UI/UX Designer",
        department: "Design",
        level: 3
    },
    {
        employee_id: "luw7q2le7vb",
        name: "James Joyce",
        email: "fcoqi@gmail.com",
        phone: "0096226498",
        position: "Team Lead",
        department: "Engineering",
        level: 2
    },
    {
        employee_id: "luwq5705ah0",
        name: "Harper Lee",
        email: "phtlm@gmail.com",
        phone: "1865448557",
        position: "SDE-1",
        department: "Engineering",
        level: 3
    },
    {
        employee_id: "luwqw1wc8hz",
        name: "Justin",
        email: "lrqgv@gmail.com",
        phone: "0104299166",
        position: "Team Lead",
        department: "Engineering",
        level: 2
    },
    {
        employee_id: "luw5m6574nq",
        name: "Jack London",
        email: "pmwrw@gmail.com",
        phone: "2094956115",
        position: "Team Lead",
        department: "Engineering",
        level: 2
    },
    {
        employee_id: "luwrg1etbw7",
        name: "Noah Webster",
        email: "fxcbj@gmail.com",
        phone: "0766493614",
        position: "Team Lead",
        department: "Engineering",
        level: 2
    },
    {
        employee_id: "luw4el2azpo",
        name: "Isabella Bird",
        email: "snvre@gmail.com",
        phone: "7689539903",
        position: "Team Lead",
        department: "HR",
        level: 2
    },
    {
        employee_id: "luws9u3br79",
        name: "Henry Ford",
        email: "fisae@gmail.com",
        phone: "5079578383",
        position: "SDE-2",
        department: "Engineering",
        level: 3
    },
    {
        employee_id: "luwrle94yht",
        name: "Liam Neeson",
        email: "mlriu@gmail.com",
        phone: "0379503602",
        position: "SDE-1",
        department: "Engineering",
        level: 3
    },
    {
        employee_id: "luwt1p43lj7",
        name: "James ",
        email: "vrwti@gmail.com",
        phone: "5807300836",
        position: "SDE-2",
        department: "Engineering",
        level: 3
    },
    {
        employee_id: "luw4qktda47",
        name: "Oscar Wilde",
        email: "gvddd@gmail.com",
        phone: "0187175203",
        position: "UI/UX Designer",
        department: "Design",
        level: 3
    },
    {
        employee_id: "luwhk7wqflx",
        name: "Sophia Kimms",
        email: "dmpqv@gmail.com",
        phone: "2308465645",
        position: "Head of Engineering",
        department: "Engineering",
        level: 1
    },
    {
        employee_id: "luw5n2ph9c",
        name: "Thomas Edison",
        email: "jhggf@gmail.com",
        phone: "9545345430",
        position: "HR Manager",
        department: "HR",
        level: 3
    },
    {
        employee_id: "luw4el2azps",
        name: "Stephen Bird",
        email: "rtyuj@yahoo.com",
        phone: "7689539903",
        position: "HR Manager",
        department: "HR",
        level: 3
    },
    {
        employee_id: "luw5n2ph9d",
        name: "Peterson",
        email: "peterson@gmail.com",
        phone: "6454353435",
        position: "HR Manager",
        department: "HR",
        level: 3
    },
    {
        employee_id: "luw5n2ph9e",
        name: "James",
        email: "james@outlook.com",
        phone: "6451353435",
        position: "HR Manager",
        department: "HR",
        level: 3
    },
    {
        employee_id: "luw5n2ph9f",
        name: "Emily Johnson",
        email: "emily.johnson@.com",
        phone: "6454353435",
        position: "Team Lead",
        department: "HR",
        level: 2
    }
];
