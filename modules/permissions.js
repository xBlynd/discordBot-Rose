module.exports = {
    // Discord Perms
    MANAGE_GUILD: (message) => message.member.hasPermission('MANAGE_GUILD') ? message.member.hasPermission('MANAGE_GUILD') : 'MANAGE_GUILD Permission',

    // Custom Perms
    admin: (message) => message.admin ? message.admin : 'Bot Admin',
    messageConent: (message) => message.content ? true : 'This command requires aditional parameters',
    staff: (message) => message.member.roles.filter(r => r.id === '420079740024782858').size ? true : 'Community Staff',
};
