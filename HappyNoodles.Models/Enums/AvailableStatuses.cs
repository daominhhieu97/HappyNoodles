using System.ComponentModel;

namespace HappyNoodles_ManagementApp.Models.Enums
{
    public enum AvailableStatuses
    {
        [Description("In stock")]
        InStock = 1,

        [Description("Out Of Stock")]
        OutOfStock = 2
    }
}
