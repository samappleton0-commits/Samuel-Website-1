import SecuritySettingsForm from '@/components/admin/settings/security-settings-form'


export default function SecurityPage(){


return (

<div className="space-y-8">


<div>

<h1 className="text-3xl font-bold">

Security Settings

</h1>


<p className="mt-2 text-muted-foreground">

Update your account password and security preferences.

</p>


</div>





<SecuritySettingsForm />


</div>

)


}